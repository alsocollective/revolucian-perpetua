var express = require('express'),
	app = express(),
	views = require('./my_nodes/views'),
	socket = require('./my_nodes/socket'),
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
		var msg = decoder.write(data),
			split = msg.split(" ");
		if (split[0] == "CP") {
			if(split[1]=="lobby"){
				split[1] = "";
			}
			socket.io.sockets.emit("CP",split[1]);
			socket.setCurrentPage(split[1]);
		} else if(split[0] =="MT"){
			socket.io.sockets.emit("meta",split[1]);
			socket.setMeta(split[1]);
		} else if(split[0] =="RED"){
			if(socket.getSimpleIDRev()[1]){
				console.log("forward red");
				socket.io.sockets.emit("red",socket.getSimpleIDRev()[split[1]]);
			}
		}
	});
});

tcp.listen(5000, function() {
	console.log('TCP running at port 5000\n');
});

console.log("HTTP server running at port 8000\n");
console.log("Socket IO running at port 3000\n");