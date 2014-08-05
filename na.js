var express = require('express'),
	app = express(),
	views = require('./my_nodes/views'),
	socket = require('./my_nodes/socket'),
	// SerialPort = require("serialport").SerialPort,
	// dgram = require("dgram"),
	// udp = dgram.createSocket("udp4"),
	StringDecoder = require('string_decoder').StringDecoder,
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


var decoder = new StringDecoder('utf8');
var tcp = net.createServer(function(sock) {
	socket.setTCP(sock);
	console.log('server connected');
	sock.on('end', function() {
		console.log('server disconnected');
		socket.setTCP(null);
	});

	sock.on('data', function(data) {
		var msg = decoder.write(data);
		if(msg.substring(0,2) == "CP"){
			socket.io.sockets.emit("CP",msg.substring(3,msg.length-2))
		}
	});
});

tcp.listen(5000, function() { 
	console.log('TCP running at port 5000\n');
});

console.log("HTTP server running at port 8000\n");
console.log("Socket IO running at port 3000\n");

