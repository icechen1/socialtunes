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
var music = [];

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
    })

});

db.init(); //initialize the database


http.listen(process.env.PORT||3005, function(){
    console.log('listening on port '+ process.env.PORT||3005);
});

io.on('connection', function(socket){
    window.console.log('a user connected');

    socket.on('new_queue', function(msg){
        socket.emit('new_queue', msg);
        window.console.log(msg);
        window.queue.push({url:msg}); //add to queue
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

var addMusic = function(err, musicfile){
    if (err) window.console.log(err);
    else{
        music.push(musicfile);
        //window.console.log("Pushed");
        //window.console.log(musicfile);
        id3({file: musicfile, type: id3.OPEN_LOCAL }, function(err, tags) {
            if (err) throw err;
            //window.console.log(tags);
        /*
         * Keep working on this
         */
            var song = {
                title: tags.title || "Unknown",
                album: tags.album || "Unknown Album",
                artist: tags.artist || "Unknown Artist",
                url: musicfile
            };
            //console.log(song)
            db.saveSong(song);

            if (tags.v2.image) {
                window.console.log(String.fromCharCode.apply(null, tags.v2.image.data));
            }

        });
    }
};

this.setDirectory = function(dir){
    //Clear the old database index
    db.clearDb();
    musicPath = dir;
    // walk(musicPath, /.mp3$/, addMusic);
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
    })
    finder.on("patherror", function(err, strPath) {
        window.console.log("Error for Path " + strPath + " " + err)  // Note that an error in accessing a particular file does not stop the whole show
    })
    finder.on("error", function(err) {
        window.console.log("Global Error " + err);
    })
    finder.startSearch();
};

//walk("C:\\Users\\Public\\Music\\Sample Music", /.mp3$/, addMusic);

