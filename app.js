var express = require('express');
var app = express();
var http = require('http').Server(app);

app.use(express.static(__dirname + '/app'));

app.get('/', function(req, res){
  res.sendfile('app/index.html');
});

http.listen(process.env.PORT||3000, function(){
  console.log('listening on port '+ process.env.PORT||3000);
});