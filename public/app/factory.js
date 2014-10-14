var factories = {};

factories.socket = function($rootScope, $location) {
<<<<<<< HEAD
    var socket = io.connect("192.168.0.103:3000");
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
=======
	var socket = io.connect("192.168.0.102:3000");
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
>>>>>>> f8be43e5d4fa5e54d45dc454160d59a110d72921
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