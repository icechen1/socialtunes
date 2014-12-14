var express = require('express');
var app = express();
var http = require('http').Server(app);
var fs = require('fs');
var music = [];
var io = require("socket.io")(http);
var id3 = require('id3js');
var musicPath = "/home/icechen1/Downloads/";
var Datastore = require('nedb');
var path = require('path');
var node_find_files = require("node-find-files");
// Load native UI library
//var gui = require('nw.gui');

app.use(express.static(__dirname + '/app'));

app.get('/', function(req, res){
  res.sendfile('app/index.html');
});

/**
 * Set up database using NeDB
 * See also https://github.com/louischatriot/nedb
 */

// Type 4: Persistent datastore for a Node Webkit app
// For example on Linux, the datafile will be ~/.config/nwtest/nedb-data/something.db
// path.join(gui.App.dataPath, 'index.db')
var db = {};
db.music = new Datastore({ filename:'index.db', autoload: true  });
db.settings = new Datastore({ filename:'settings.db', autoload: true  });

// You need to load each database (here we do it asynchronously)

db.music.loadDatabase();
db.settings.loadDatabase();

http.listen(process.env.PORT||3005, function(){
  console.log('listening on port '+ process.env.PORT||3005);
});

io.on('connection', function(socket){
    window.console.log('a user connected');
    
    socket.on('new_queue', function(msg){
        socket.emit('new_queue', msg);
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

// var walk = function(dir, match, done) {
//   fs.readdir(dir, function(err, list) {
//     if (err) return done(err);
//     else{
//       var pending = list.length;
//       if (!pending) return //window.console.log("No files here in " + dir + "!");
//       list.forEach(function(file) {
//         file = dir + '/' + file;
//         fs.stat(file, function(err, stat) {
//           if (err){
//             return done(err);
//           }
//           else{
//             if (stat && stat.isDirectory()) {
//               walk(file, match, addMusic);
//                 //function(err, res) {
//                 //results = results.concat(res);
//                 //if (!--pending) done(null, results);
//               //});
//             } else {
//               if (match.test(file)) {
//                 done(null, file);
//               }
//               //if (!--pending) done(null, results);
//             }
//           }
//         });
//       });
//     }
//   });
// };

var addMusic = function(err, musicfile){
  if (err) window.console.log(err);
  else{
    music.push(musicfile);
    //window.console.log("Pushed");
    //window.console.log(musicfile);
    id3({file: musicfile, type: id3.OPEN_LOCAL }, function(err, tags) {
        if (err) throw err;
        window.console.log(String.fromCharCode.apply(null, tags.v2.image.data));
    });
  }
};

this.setDirectory = function(dir){
  musicPath = dir;
  // walk(musicPath, /.mp3$/, addMusic);
  var finder = new node_find_files({
    rootFolder : musicPath,
    filterFunction : function (path, stat) {
        return /.mp3$/i.test(path);
    }
  });

  finder.on("match", function(strPath, stat) {
      window.console.log(strPath + " - " + stat.mtime);
      addMusic(null, strPath);
  })
  finder.on("complete", function() {
      window.console.log("Finished")
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

