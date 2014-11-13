var factories = {};

factories.Socket = function($rootScope, $location) {
	var socket = io.connect("http://192.168.0.107:3000");
	return {
		on: function(eventName, callback) {
			socket.on(eventName, function(msg) {
				$rootScope.$apply(function() {
					callback.apply(socket, [msg]);
				});
			});
		},
		onunbind: function(eventName) {
			socket.removeAllListeners(eventName);
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

factories.CurrentPage = function(Socket, Userset) {
	var factory = {};
	factory.page = "";
	factory.meta = null;
	factory.getMeta = function() {
		if (!factory.meta) {
			//TODO retrive current meta tag from Node
			return "song1" + Userset.getUserSub();
		} else {
			return factory.meta + Userset.getUserSub();
		}
	}

	return factory;
}

factories.Userset = function($cookies, Socket, $location) {
	var factory = {};
	factory.ticket = null;
	factory.subuser = null;

	factory.getUserSub = function() {
		if (factory.subuser) {
			return factory.subuser;
		} else {
			factory.subuser = "-" + (parseInt(factory.ticket) % 2);
			return factory.subuser;
		}
	}
	return factory
}

timeApp.factory(factories);