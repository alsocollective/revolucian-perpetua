var express = require('express'),
	app = express(),
	views = require('./my_nodes/views'),
	socket = require('./my_nodes/socket'),
	SerialPort = require("serialport").SerialPort;


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