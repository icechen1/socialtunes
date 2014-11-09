var express = require('express');
var app = express();
var http = require('http').Server(app);
var fs = require('fs');


app.use(express.static(__dirname + '/app'));

app.get('/', function(req, res){
  res.sendfile('app/index.html');
});

http.listen(process.env.PORT||3000, function(){
  console.log('listening on port '+ process.env.PORT||3000);
});

var walk = function(dir, match, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function(file) {
      file = dir + '/' + file;
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, match, function(err, res) {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          if (match.test(file)) {
            results.push(file);
            console.log(file);
          }
          if (!--pending) done(null, results);
        }
      });
    });
  });
};

/*walk("C:/Users/dave_000/", /.mp3$/, function(err, results) {
  if (err) throw err;
  //console.log(results);
});*/