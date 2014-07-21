var factories = {};

factories.socket = function($rootScope, $location) {
	var socket = io.connect("192.168.0.14:3000");
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

factories.UserSet = function($cookies, socket) {
	var factory = {};
	factory.user = null;
	factory.ticket = null;
	if ($cookies.user) {
		factory.user = $cookies.user;
	} else {
		factory.user = Math.floor(Math.random() * 200);
		$cookies.user = factory.user
		socket.emit("set ID", factory.user, function(socket, arg) {
			console.log(socket);
			console.log(ar);
		})
	}
	factory.setUserId = function(ticketNum, username) {
		factory.user = username;
		factory.ticket = ticketNum;
	}
	return factory
}

timeApp.factory(factories);