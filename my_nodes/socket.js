var http = null,
	io = null,
	tcp = null,
	dat = null,
	spd = [0, 0];


exports.setup = function(app) {
	http = require('http').Server(app),
	io = require('socket.io');
	http.listen(3000);
	io = io.listen(http);
	exports.io = io;
}

exports.setTCP = function(tcpin) {
	tcp = tcpin;
}

exports.connect = function(socket) {

	//LOGIN
	socket.on("getID", function(msg) {
		console.log("gave ID:\t..\t" + msg);
		socket.emit("setID", socket.id);
	});
	socket.on("setID", function(msg) {
		socket.id = msg;
		console.log("set ID:\t..\t" + msg);
	});
	socket.on("ID", function(msg) {
		console.log("saying ID:\t..\t" + msg);
		socket.emit("ID", socket.id);
	});


	//ADMIN
	socket.on("CP", function(msg) {
		console.log("Change Page:\t" + msg);
		io.sockets.emit("CP", msg);
	})









	//for test tapping
	socket.on("tap", function(msg) {
		if (tcp) {
			tcp.write("tap " + msg + " " + this.id + "\n");
		}
	})

	//diagnostics
	socket.on("dg", function(msg) {
		io.sockets.emit('lv', msg);
	});

	socket.on("repeat", function(msg) {
		io.sockets.emit(msg.header, msg.msg);
	})

	socket.on("disconnect", function(msg) {
		if (tcp) {
			console.log("disconnect");
			console.log(this.id);
			tcp.write("left " + ". " + this.id + "\n");
			console.log("should of sent message");
		}
	})
}