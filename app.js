var express = require('express');
var app = express();
var http = require('http').Server(app);
var fs = require('fs');
var music = [];
var io = require("socket.io")(http);
var id3 = require('id3js');

app.use(express.static(__dirname + '/app'));

app.get('/', function(req, res){
  res.sendfile('app/index.html');
});

http.listen(process.env.PORT||3002, function(){
  console.log('listening on port '+ process.env.PORT||3002);
});

io.on('connection', function(socket){
  console.log('a user connected');
}); 

var walk = function(dir, match, done) {
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var pending = list.length;
    if (!pending) return window.console.log("No files here in " + dir + "!");
    list.forEach(function(file) {
      file = dir + '/' + file;
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, match, addMusic);
            //function(err, res) {
            //results = results.concat(res);
            //if (!--pending) done(null, results);
          //});
        } else {
          if (match.test(file)) {
            done(null, file);
          }
          //if (!--pending) done(null, results);
        }
      });
    });
  });
};

var addMusic = function(err, musicfile){
  if (err) throw err;
  music.push(musicfile);
  window.console.log("Pushed");
  window.console.log(musicfile);
  id3({file: musicfile, type: id3.OPEN_LOCAL }, function(err, tags) {
      if (err) throw err;
      window.console.log(tags.title);
  });
}

walk("C:\\Users\\Public\\Music\\Sample Music", /.mp3$/, addMusic);
