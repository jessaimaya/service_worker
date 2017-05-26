var express = require('express');
var cors = require('cors')


var app = express();
var host = '0.0.0.0',
    port = 3000;

var server = app.listen(port, host, function(){
  console.log('Listening at http://%s:%s', host, port);
  console.log('Index -  http://%s:%s/index.html', host, port);
});

app.use(cors())
app.use(express.static('public'))
app.use('/node_modules',  express.static(__dirname + '/node_modules'));

app.get('/index.html', function(req, res){
  res.send('index.html');
});

