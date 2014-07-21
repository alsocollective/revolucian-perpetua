var express = require('express'),
	app = express(),
	views = require('./my_nodes/views'),
	socket = require('./my_nodes/socket'),
	SerialPort = require("serialport").SerialPort,
	dgram = require("dgram"),
	udp = dgram.createSocket("udp4"),
	StringDecoder = require('string_decoder').StringDecoder;

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

var TDSocket = null;
var decoder = new StringDecoder('utf8');
//UDP
udp.on("listening",function(){
	console.log("UDP server running at port 5000\n");
});
udp.on("message",function(msg,info){
	var msg = decoder.write(msg);
	msg = msg.substring(24,msg.length)
	console.log(msg)
});

udp.bind(5000)
// net.createServer(function (socket) {
// 	TDSocket = socket;
// 	socket.write("Welcome \n");
// 	console.log("connection");
// }).listen(5000)

// setInterval(function(){
// 	if(TDSocket){
// 		TDSocket.write(Math.floor(Math.random()*1000)+"\n")
// 	}
// },50)


console.log("HTTP server running at port 8000\n");
console.log("Socket IO running at port 3000\n");

console.log("HTTP server running at port 8000\n");
console.log("Socket IO running at port 3000\n");
console.log("TCP/Ip server running at port 5000\n");
