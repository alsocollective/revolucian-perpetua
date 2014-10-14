var factories = {};

factories.socket = function($rootScope, $location) {
	var socket = io.connect("192.168.0.158:3000");
	return {
		on: function(eventName, callback) {
			socket.on(eventName, function(msg) {
				$rootScope.$apply(function() {
					callback.apply(socket, [msg]);
				});
			});
		},
		emit: function(eventName, data, callback) {
			socket.emit(eventName, data, function() {
				var args = arguments;
				$rootScope.$apply(function() {
					if (callback) {
						callback.apply(socket, args);
					}
				});
			})
		}
	};
}

factories.UserSet = function($cookies, socket, socket, $location) {
	var factory = {};
	factory.ticket = null;

	if ($cookies.ticket) {
		factory.ticket = $cookies.ticket;
		socket.emit("setID", factory.ticket);
	} else {
		// factory.ticket = Math.floor(Math.random() * 200);
		// $cookies.ticket = factory.ticket
		// socket.emit("set ID", factory.ticket, function(socket, arg) {
		//     console.log(socket);
		//     console.log(ar);
		// })
	}
	factory.checkUser = function() {
		console.log(factory.ticket);
		if (factory.ticket == null) {
			$location.path('/')
		}
	}
	factory.setUserId = function(ticketNum) {
		factory.ticket = ticketNum;
		$cookies.ticket = ticketNum;
		socket.emit("setID", factory.ticket);
	}
	return factory
}

timeApp.factory(factories);