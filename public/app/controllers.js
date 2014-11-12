var controllers = {};

timeApp.communication = {
	setupbol: false,
	setup: function(Socket, Cookie, Userset) {
		if (timeApp.communication.setupbol) {
			return false;
		}
		timeApp.communication.setupbol = true;
		if (Cookie.ticket) {
			Userset.ticket = Cookie.ticket;
			Socket.emit("setID", Cookie.ticket);
		} else {
			Socket.emit("getID", "I have no id");
			Socket.on("setID", function(msg) {
				Userset.ticket = msg;
				Cookie.ticket = msg;
				console.log(msg);
			})
		}
	},
	test: function(Socket) {
		Socket.emit("ID");
		Socket.on("ID", function(msg) {
			console.log(msg);
		})
	},
	pageChange: false,
	exitfunction: null,
	setupPageChange: function(Socket, location) {
		if (timeApp.communication.pageChange) {
			return false;
		}
		Socket.on("CP", function(msg) {
			console.log(msg);
			if (timeApp.communication.exitfunction) {
				console.log("coms exit");
				timeApp.communication.exitfunction(Socket)
				timeApp.communication.exitfunction = null;
			}
			location.path("/" + msg);
		})
		timeApp.communication.pageChange = true;
	}
}


timeApp.allfunc = {
	firstvisit: function(cookie, location) {
		if (!cookie.ticket) {
			location.path("/");
		}
	}
}


controllers.lobby = function($scope, $cookies, $location, Socket, Userset) {
	timeApp.communication.setup(Socket, $cookies, Userset); //setup initiall message
	timeApp.communication.setupPageChange(Socket, $location); //changepage on message
	$scope.id = Userset.ticket || $cookies.ticket;
}

controllers.tap = function($scope, $cookies, $location, Socket, Userset) {
	timeApp.allfunc.firstvisit($cookies, $location); //return to lobby if no cookie
	timeApp.communication.setupPageChange(Socket, $location); //changepage on message
	$scope.id = Userset.ticket || $cookies.ticket;


	if (timeApp.diagnostics) {
		timeApp.diagnostics.addTiltEventListener(Socket);
		timeApp.communication.exitfunction = timeApp.diagnostics.onexit;
		//timeApp.diagnostics.createDiagnosticButton(Socket);
	}
}

controllers.shake = function($scope, $cookies, $location, Socket, Userset) {
	timeApp.allfunc.firstvisit($cookies, $location); //return to lobby if no cookie
	timeApp.communication.setupPageChange(Socket, $location); //changepage on message
	$scope.id = Userset.ticket || $cookies.ticket;
}


controllers.admin = function($scope, $cookies, $location, Socket, Userset) {
	timeApp.allfunc.firstvisit($cookies, $location);
	$scope.id = Userset.ticket || $cookies.ticket;

	$scope.submitted = function() {
		Socket.emit("CP", $scope.msg);
	}
}

controllers.diagnostics = function($scope, $cookies, $location, Socket, Userset) {
	timeApp.allfunc.firstvisit($cookies, $location); //return to lobby if no cookie
	timeApp.communication.setupPageChange(Socket, $location); //changepage on message
	$scope.id = Userset.ticket || $cookies.ticket;

	if (timeApp.diagnostics) {
		timeApp.communication.exitfunction = timeApp.diagnostics.onexit;
		timeApp.diagnostics.init(Socket);
	}
}

timeApp.controller(controllers);