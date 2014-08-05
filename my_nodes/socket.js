var http = null,
	io = null,
	tcp = null;


exports.setup = function(app) {
	http = require('http').Server(app),
	io = require('socket.io');
	http.listen(3000);
	io = io.listen(http);
	exports.io = io;
}

exports.setTCP = function(tcpin){
	tcp = tcpin;
}

exports.connect = function(socket) {
	io.sockets.emit('setup', {
		"msg": "WELCOME"
	});

	console.log("someone connected");
	socket.on("set ID", function(msg) {
		this.id = msg;
		console.log(msg, "connected");
	})

	socket.on("tapped",function(msg){
		tcp.write("tapped "+msg['device'])
	})

	//diagnostics
	socket.on("diagnostics", function(msg) {
		//console.log(msg, "data");
		io.sockets.emit('livedata', {
			"tap": x
	})

	socket.on("repeat", function(msg) {
		console.log(msg)
		io.sockets.emit(msg.header, msg.msg);
	})
}

exports.dissconect = function(socket) {

}

