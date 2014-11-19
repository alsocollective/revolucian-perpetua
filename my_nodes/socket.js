var http = null,
	io = null,
	tcp = null,
	dat = null,
	spd = [0, 0],
	currentpage = "",
	meta = "",
	simpleId = {},
	simpleIdRev = {},
	userArray = [],
	simpleIdCount = 0;


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

exports.setCurrentPage = function(newPage) {
	currentpage = newPage;
}
exports.setMeta = function(newMeta) {
	meta = newMeta;
}
exports.getSimpleID = function(){
	return simpleId;
}
exports.getSimpleIDRev = function(){
	return simpleIdRev;
}
exports.userArray = function(){
	return userArray;
}


exports.connect = function(socket) {

	//LOGIN
	//for initial connections
	socket.on("getID", function(msg) {
		console.log("saying getID:\t..\t" + msg);

		// if (simpleId[msg]) {
		// 	socket.simpleId = simpleId[msg];
		// } else {
		// 	simpleIdCount += 1;
		// 	socket.simpleId = simpleIdCount;
		// 	userArray.push(socket.id);
		// }

		//iterate count
		simpleIdCount += 1;
		//assign the counter id to the element
		socket.simpleId = simpleIdCount;
		//add the id to the list (for reconnects... so we know what id they are)
		simpleId[socket.id] = simpleIdCount;
		simpleIdRev[simpleIdCount] = socket.id;
		//we add them to the userlist
		userArray.push(socket.id);
		//tell the user what id they are
		socket.emit("setID", socket.id);
	});

	//for reconnections
	socket.on("setID", function(msg) {
		console.log("saying setID:\t..\t" + msg);
		//the user knows what ID they were
		//so we now assign them their id
		socket.id = msg;
		//we see if we can give them back their counter id
		if (simpleId[msg]) {
			//we can give the back their number 
			socket.simpleId = simpleId[msg];
		} else {
			//we can't so we need to add it to the db
			//this would happen if we reset the node server, and people reconnect
			simpleIdCount += 1;
			socket.simpleId = simpleIdCount;
			simpleId[msg] = simpleIdCount;
			simpleIdRev[simpleIdCount] = msg;

			userArray.push(socket.id);
		}
	});

	socket.on("ID", function(msg) {
		console.log("saying ID:\t..\t" + msg);
		simpleIdCount += 1;
		socket.simpleId = simpleIdCount;
		simpleId[socket.id] = simpleIdCount;

		socket.emit("ID", socket.id);
		// socket.emit("CP", currentpage);
		// socket.emit("meta", meta)
	});


	socket.on("getpage", function() {
		socket.emit("CP", currentpage);
	})
	socket.on("setpage", function(msg) {
		currentpage = msg;
	})

	socket.on("getmeta", function(msg, one, two) {
		socket.emit("meta", meta)
	})
	socket.on("setmeta", function(msg) {
		meta = msg;
	})


	//ADMIN
	socket.on("CP", function(msg) {
		console.log("Change Page:\t" + msg);
		currentpage = msg;
		io.sockets.emit("CP", currentpage);
	})
	socket.on("diagdata", function(msg) {
		if (typeof msg == "object") {
			// console.log("diagnostic data: x:" + parseInt(msg.x) + "\ty:" + parseInt(msg.y) + "\tz:" + parseInt(msg.z))
		} else {
			// console.log("diagnostic data:" + msg);
		}
		io.sockets.emit("diagdata", msg);
	})


	//TO TD////
	socket.on("tap", function(msg) {
		console.log("tap:\t..\t" + msg + " " + simpleId[this.id])
		if (tcp) {
			//console.log("\ttap 1 " + this.simpleId + "\n")
			tcp.write("tap 1 " + this.simpleId + "\n");
		} else {
			console.log("\t\t\tNo TCP connected");
		}
	})
	socket.on("sha", function(msg) {
		console.log("shake:\t..\t" + msg + " " + simpleId[this.id])
		if (!this.oddoreven) {
			console.log("setting odd or even")
			this.oddoreven = (this.id.charCodeAt(0) % 2)
		}
		if (tcp) {
			console.log("\tsha " + msg + " " + this.simpleId + " " + this.oddoreven + "\n")
			tcp.write("sha " + msg + " " + this.simpleId + " " + this.oddoreven + "\n");
		} else {
			console.log("\t\t\tNo TCP connected");
		}
	})



	//FROM TD////
	socket.on("simulatePush", function(msg) {
		console.log("push:\t..\t" + msg)
		currentpage = "song";
		meta = msg;
		io.sockets.emit("push", msg);
	})









	//for test tapping
	// socket.on("tap", function(msg) {
	// 	if (tcp) {
	// 		tcp.write("tap " + msg + " " + this.simpleId + "\n");
	// 	}
	// })

	//diagnostics
	socket.on("dg", function(msg) {
		io.sockets.emit('lv', msg);
	});

	socket.on("repeat", function(msg) {
		io.sockets.emit(msg.header, msg.msg);
	})

	socket.on("disconnect", function(msg) {
		if (tcp) {
			console.log("dis:\t..\t" + this.id);
			tcp.write("left " + ". " + this.simpleId + "\n");
		}

		var index = userArray.indexOf(this.id);
		if(index != null && index >= 0){
			userArray.splice(index,1);
		}
	})
}