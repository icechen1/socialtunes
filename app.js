var express = require('express');
var app = express();
var http = require('http').Server(app);
var fs = require('fs');
var music = [];


app.use(express.static(__dirname + '/app'));

app.get('/', function(req, res){
  res.sendfile('app/index.html');
});

http.listen(process.env.PORT||3000, function(){
  console.log('listening on port '+ process.env.PORT||3000);
});

var walk = function(dir, match, done) {
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var pending = list.length;
    if (!pending) return done(null, results);
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

var addMusic = function(err, file){
  if (err) throw err;
  music.push(file);
  console.log("Pushed");
  console.log(file);
}

walk("C:\\Users\\Public\\Music\\Sample Music", /.mp3$/, addMusic);