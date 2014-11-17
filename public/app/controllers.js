var controllers = {};



controllers.lobby = function($scope, $cookies, $location, Socket, Userset, CurrentPage) {
	timeApp.communication.setup(Socket, $cookies, Userset); //setup initiall message
	timeApp.allfunc.firstvisit($cookies, $location, Userset, CurrentPage, Socket); //return to lobby if no cookie	
	timeApp.communication.setupPageChange(Socket, $location, CurrentPage); //changepage on message
	$scope.id = Userset.ticket || $cookies.ticket;
}

controllers.tap = function($scope, $cookies, $location, Socket, Userset, CurrentPage) {
	timeApp.allfunc.firstvisit($cookies, $location, Userset, CurrentPage, Socket); //return to lobby if no cookie
	timeApp.communication.setupPageChange(Socket, $location, CurrentPage); //changepage on message
	$scope.id = Userset.ticket || $cookies.ticket;


	timeApp.tap.init(Socket);

	// if (timeApp.diagnostics) {
	// 	timeApp.diagnostics.addTiltEventListener(Socket);
	// 	// timeApp.communication.exitfunction = timeApp.diagnostics.onexit;
	// 	timeApp.diagnostics.createDiagnosticButton(Socket);
	// }
}

controllers.shake = function($scope, $cookies, $location, Socket, Userset, CurrentPage) {
	timeApp.allfunc.firstvisit($cookies, $location, Userset, CurrentPage, Socket); //return to lobby if no cookie
	timeApp.communication.setupPageChange(Socket, $location, CurrentPage); //changepage on message
	$scope.id = Userset.ticket || $cookies.ticket;

	timeApp.shake.init(Socket)
}


controllers.pushedpage = function($scope, $cookies, $location, Socket, Userset, CurrentPage) {
	timeApp.allfunc.firstvisit($cookies, $location, Userset, CurrentPage, Socket);
	timeApp.communication.setupPageChange(Socket, $location, CurrentPage); //changepage on message	
	$scope.id = Userset.ticket || $cookies.ticket;

	if (timeApp.pushedpage) {
		timeApp.pushedpage.init(CurrentPage);
		timeApp.communication.exitfunction = timeApp.pushedpage.onexit;
	}
}

controllers.newSong = function($scope, $cookies, $location, Socket, Userset, CurrentPage, SongSets) {
	timeApp.allfunc.firstvisit($cookies, $location, Userset, CurrentPage, Socket);
	timeApp.communication.setupPageChange(Socket, $location, CurrentPage); //changepage on message	
	$scope.id = Userset.ticket || $cookies.ticket;

	if (timeApp.newSong) {
		timeApp.newSong.init($scope, CurrentPage, SongSets, $location, Socket)
	}
}


controllers.admin = function($scope, $cookies, $location, Socket, Userset, CurrentPage) {
	timeApp.allfunc.firstvisit($cookies, $location, Userset, CurrentPage, Socket);
	$scope.id = Userset.ticket || $cookies.ticket;

	if (timeApp.cAdmin) {
		timeApp.cAdmin.init($scope, Socket);
	}
}


controllers.diagnostics = function($scope, $cookies, $location, Socket, Userset, CurrentPage) {
	timeApp.allfunc.firstvisit($cookies, $location, Userset, CurrentPage, Socket); //return to lobby if no cookie
	timeApp.communication.setupPageChange(Socket, $location, CurrentPage); //changepage on message
	$scope.id = Userset.ticket || $cookies.ticket;

	if (timeApp.diagnostics) {
		timeApp.communication.exitfunction = timeApp.diagnostics.onexit;
		timeApp.diagnostics.init(Socket);
	}
}

timeApp.controller(controllers);