var http = null,
	io = null,
	tcp = null,
	dat = null,
	spd = [0, 0],
	currentpage = "";


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
		socket.emit("CP", currentpage);
	});
	socket.on("setID", function(msg) {
		socket.id = msg;
		console.log("set ID:\t..\t" + msg);
		socket.emit("CP", currentpage);
	});
	socket.on("ID", function(msg) {
		console.log("saying ID:\t..\t" + msg);
		socket.emit("ID", socket.id);
		socket.emit("CP", currentpage);
	});


	//ADMIN
	socket.on("CP", function(msg) {
		console.log("Change Page:\t" + msg);
		currentpage = msg;
		io.sockets.emit("CP", currentpage);
	})
	socket.on("diagdata", function(msg) {
		if (typeof msg == "object") {
			console.log("diagnostic data: x:" + parseInt(msg.x) + "\ty:" + parseInt(msg.y) + "\tz:" + parseInt(msg.z))
		} else {
			console.log("diagnostic data:" + msg);
		}
		io.sockets.emit("diagdata", msg);
	})


	//TO TD////
	socket.on("tap", function(msg) {
		console.log("tap:\t..\t" + msg)
		if (tcp) {
			console.log("\t\t\tforwarding message to TD");
			tcp.write("tap " + msg + " " + this.id + "\n");
		} else {
			console.log("\t\t\tNo TCP connected");
		}
	})
	socket.on("sha", function(msg) {
		console.log("shake:\t..\t" + msg)

	})



	//FROM TD////
	socket.on("simulatePush", function(msg) {
		console.log("push:\t..\t" + msg)
		io.sockets.emit("push", msg);
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