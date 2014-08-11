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
	io.sockets.emit('setup', {
		"msg": "WELCOME"
	});

	console.log("someone connected");
	socket.on("set ID", function(msg) {
		this.id = msg;
		console.log(msg, "connected");
	})

	socket.on("tapped", function(msg) {
		//tcp.write("tapped " + msg['device'])
		io.sockets.emit('cTap', msg);
	})


	//for test tapping
	socket.on("tap", function(msg) {

		//console.log(socket.client.conn.id);

		console.log("tap: " + msg);

		// for (key in io.sockets.connected) {
		// 	console.log(key);
		// }
		// console.log(io.sockets.connected);

		//tcp.write("tap " + msg + " " + socket.client.conn.id + "\n");
	})

	//diagnostics
	socket.on("dg", function(msg) {
		//console.log(msg, "data");
		io.sockets.emit('lv', msg);

		/*var mgg = JSON.stringify( msg );

		var getUTF8Size = function( str ) {
			
			var sizeInBytes = str.split('').map(function( ch ) {
				return ch.charCodeAt(0);
		}).map(function( uchar ) {
			return uchar < 128 ? 1 : 2;
		}).reduce(function( curr, next ) {
			return curr + next;
		});
			return sizeInBytes;
		};

		var msgSize = getUTF8Size( mgg );

		console.log(msgSize);*/

		/*if(msg){

			if(dat < 100){
				dat++
			}else{
				dat = 0;
				spd.shift();
				spd[spd.length] = Date.now();

				console.log(100 / (Math.abs(spd[0] - spd[1]) / 1000));
			}
		}*/
	});

	socket.on("repeat", function(msg) {
		console.log(msg)
		io.sockets.emit(msg.header, msg.msg);
	})
}

exports.disconnect = function(socket) {
	console.log(socket);
	cosnole.log("disconnected");
}