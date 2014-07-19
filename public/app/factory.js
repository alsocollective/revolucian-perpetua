var factories = {};

factories.socket = function($rootScope) {
	var socket = io.connect("192.168.100.106:3000");
	return {
		on: function(eventName, callback) {
			socket.on(eventName, function() {
				var args = arguments;
				$rootScope.$apply(function() {
					callback.apply(socket, args);
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
	/*if ($cookies.user) {
		factory.user = $cookies.user;
	} else {
		factory.user = Math.floor(Math.random() * 200);
		$cookies.user = factory.user
		socket.emit("set ID", factory.user, function(socket, arg) {
			console.log(socket);
			console.log(arg);
		})
	}*/
	factory.setUserId = function(ticketNum, username) {
		factory.user = username;
		factory.ticket = ticketNum;		
	}
	return factory
}

timeApp.factory(factories);