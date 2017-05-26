var express = require('express');


var app = express();
var host = '0.0.0.0',
    port = 3000;

var server = app.listen(port, host, function(){
  console.log('Listening at http://%s:%s', host, port);
  console.log('Index -  http://%s:%s/index.html', host, port);
});

app.use(express.static('public'))

app.get('/index.html', function(req, res){
  res.send('index.html');
});

app.get('/articulo.html', function(req, res){
  res.send('articulo.html');
});


