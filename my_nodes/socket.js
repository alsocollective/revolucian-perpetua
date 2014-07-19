var http = null,
	io = null;

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
	socket.on("set ID", function(msg) {
		this.id = msg;
		console.log(msg, "connected");
	})
}

exports.dissconect = function(socket) {

}