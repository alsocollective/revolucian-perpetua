var http = null,
	io = null,
	udp = null;


exports.setup = function(app) {
	http = require('http').Server(app),
	io = require('socket.io');
	http.listen(3000);
	io = io.listen(http);
	exports.io = io;
}



exports.connect = function(socket) {
	io.sockets.emit('setup', {
		"msg": "WELCOME"
	});
	console.log("some one connected");
	socket.on("set ID", function(msg) {
		this.id = msg;
		console.log(msg, "connected");
	})

	socket.on("tapped",function(msg){
		console.log("tapped "+msg)
	})


	socket.on("repeat", function(msg) {
		console.log(msg)
		io.sockets.emit(msg.header, msg.msg);
		// io.sockets.emit()
	})
}

exports.dissconect = function(socket) {

}

