var express = require('express'),
	app = express(),
	views = require('./my_nodes/views'),
	socket = require('./my_nodes/socket'),
	SerialPort = require("serialport").SerialPort,
	net = require('net');

app
	.set('views', __dirname + '/views')
	.set('view engine', 'jade')
	.use(express.static(__dirname))
	.use(express.bodyParser())

app
	.get('/', views.home);


var server = app.listen(8000);



//SOCKET io
socket.setup(app);
socket.io.on('connection', socket.connect);



//SerialPort

// var serialPort = new SerialPort("/dev/cu.usbserial-AD026BCA", {
// 	baudrate: 9600
// });

//Net 
net.createServer(function (socket) {

}).listen(5000)

console.log("HTTP server running at port 8000\n");
console.log("Socket IO running at port 3000\n");
console.log("TCP/Ip server running at port 5000\n");
