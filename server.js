var express 	= require('express');
var app 		= express()
  , server 		= require('http').createServer(app)
  , io 			= require('socket.io').listen(server);
var bodyParser  = require('body-parser');

var port = Number(process.env.PORT || 8090);

server.listen(port);

app.use(bodyParser());
app.use(express.static(__dirname + '/frontend'));

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/frontend/index.html');
});

app.post('/*', function(req, res){
	console.log(req.params['0']);
	console.log(req.body);
	console.log(req.query);
	io.sockets.emit('posted', { body: req.body, query: req.query, params: req.params });
	res.send(200, 'OK');
});

io.sockets.on('connection', function (socket) {
  	socket.emit('connected', { connected: 'Connected' });
});