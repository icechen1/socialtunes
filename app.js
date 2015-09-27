var express = require('express');
var app = express();
var http = require('http').Server(app);
var fs = require('fs');
var io = require("socket.io")(http);
var id3 = require('id3js');
var musicPath = "/home/icechen1/Downloads/";

var path = require('path');
var node_find_files = require("node-find-files");

var db = require("./modules/DatabaseManager.js");
var queue = require("./modules/Queue.js");

//var queue =[];

// Load native UI library
//var gui = require('nw.gui');

app.use(express.static(__dirname + '/app'));

app.get('/', function(req, res){
    res.sendfile('app/index.html');
});

//API Endpoint to retrieve all songs
app.get('/api/querySongs', function(req, res){
    db.querySong(function(docs){
        res.send(docs);
    });
});

//API Endpoint to retrieve a specific song
app.get('/api/querySong/:id', function(req, res){
    db.querySongByID(req.params.id, function(docs){
        res.send(docs);
    });
});

//API Endpoint to retrieve previous path
app.get('/api/querypath', function(req, res){
    db.queryPath(function(docs){
        res.send(docs);
    });
});

db.init(); //initialize the database
queue.init(db);


http.listen(process.env.PORT||3005, function(){
    console.log('listening on port '+ process.env.PORT||3005);
});

var mSocket;

io.on('connection', function(socket){
    window.console.log('a user connected ' + socket.id);
    mSocket = socket;
    socket.emit('current_queue', queue.index());

    socket.on('new_queue_item', function(msg){
        //when socket sends a song to add to queue, send it to all other cleints
        db.querySongByID(msg, function(doc){
            if (queue.add(msg)){ //push the whole song document to the array
                io.sockets.emit('new_queue_item', msg);
            } 
        });
    });

    socket.on('remove_queue_item', function(msg){
        //when socket removes a song from the queue, send it to all other clients
        db.querySongByID(msg, function(doc){
            if (queue.remove(msg)){ //remove the whole song document to the array
                io.sockets.emit('remove_queue_item', msg);
            } 
        });
    });

    socket.on('vote_up', function(msg){
        socket.emit('vote_up', msg);
    });

    socket.on('vote_down', function(msg){
        socket.emit('vote_down', msg);
    });

    socket.on('vote_cancel', function(msg){
        socket.emit('vote_cancel', msg);
    });
});

//Add a music file to the database

var addMusic = function(err, musicfile){
    if (err) window.console.log(err);
    else{
        id3({file: musicfile, type: id3.OPEN_LOCAL }, function(err, tags) {
            if (err) throw err;
            // Pictures don't seem to work, standard conflict? Cannot find album art
            var song = {
                song: tags.title || "Unknown",
                album: tags.album || "Unknown Album",
                artist: tags.artist || "Unknown Artist",
                art: tags.art || "images/hasselhoff.jpg",
                url: musicfile
            };
            db.saveSong(song);
        });
    }
};

//Set the directory to be searched

this.setDirectory = function(dir){
    //Clear the old database index
    db.clearDb();
    musicPath = dir;

    //save path in DB
    db.savePath(dir);
    
    //Find all mp3
    var finder = new node_find_files({
        rootFolder : musicPath,
        filterFunction : function (path, stat) {
            return /.mp3$/i.test(path);
        }
    });

    finder.on("match", function(strPath, stat) {
        addMusic(null, strPath);
    })
    finder.on("complete", function() {
        window.console.log("Finished");
        //db.querySong();
        if(mSocket != null) {
            mSocket.emit('initial_library', "");
        }
    })
    finder.on("patherror", function(err, strPath) {
        window.console.log("Error for Path " + strPath + " " + err)  // Note that an error in accessing a particular file does not stop the whole show
    })
    finder.on("error", function(err) {
        window.console.log("Global Error " + err);
    })
    finder.startSearch();
};


//Add a song to the queue
this.addSongToQueue = function(song){
    queue.add(song);
}

//Get DB path
this.getDBPath = function(){
    db.queryPath(function(path){
        return path;
    });
}

//walk("C:\\Users\\Public\\Music\\Sample Music", /.mp3$/, addMusic);

