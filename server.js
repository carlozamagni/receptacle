var express 	= require('express');
var app 		= express()
  , server 		= require('http').createServer(app)
  , io 			= require('socket.io').listen(server);

var port = Number(process.env.PORT || 8090);

server.listen(port);

app.use(express.static(__dirname + '/frontend'));

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/frontend/index.html');
});

app.post('/*', function(req, res){
	console.log(req.params);
	console.log(req.body);
	console.log(req.query);
	io.sockets.emit('posted', { body: req.body, query: req.query, params: req.params });
});

io.sockets.on('connection', function (socket) {
  	socket.emit('connected', { connected: 'Connected' });
});

/*
function sendTime() {
	var yVal = Math.floor(Math.random()*50);

	var rVal = Math.floor(Math.random()*100);
	var gVal = Math.floor(Math.random()*100);
	var bVal = Math.floor(Math.random()*100);
	var pVal = Math.floor(Math.random()*100);

    io.sockets.emit('datapoint', { time: new Date().toJSON(), value: yVal });
    io.sockets.emit('reportPercent', { errorNum: rVal, blueNum: bVal, okNum: gVal, warnNum: pVal });
}

setInterval(sendTime, 3000);
*/