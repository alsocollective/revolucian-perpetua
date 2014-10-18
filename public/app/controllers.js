var controllers = {};

timeApp.communication = {
	setup: function(Socket, Cookie, Userset) {
		Socket.emit()
		// Socket.on("setup", function(message) {
		// 	console.log(message);
		// })
	}
}

controllers.lobby = function($scope, $cookies, Socket, Userset) {
	timeApp.communication(Socket, $cookies);
}

controllers.tap = function($scope, $cookies, Socket, Userset) {

}

controllers.shake = function($scope, $cookies, Socket, Userset) {

}

controllers.admin = function($scope, $cookies, Socket, Userset) {

}

controllers.diagnostics = function($scope, $cookies, Socket, Userset) {

}

timeApp.controller(controllers);