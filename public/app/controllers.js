var controllers = {};



controllers.lobby = function($scope, $cookies, $location, Socket, Userset, CurrentPage) {
	timeApp.communication.setup(Socket, $cookies, Userset); //setup initiall message
	timeApp.allfunc.firstvisit($cookies, $location, Userset, CurrentPage, Socket); //return to lobby if no cookie	
	timeApp.communication.setupPageChange(Socket, $location, CurrentPage); //changepage on message
	$scope.id = Userset.ticket || $cookies.ticket;

	timeApp.modal.alert("<h2>Welcome to the Perpetual Revolution</h2><h3 id='full'>Enter Fullscreen</h3><p>Please note the following before proceeding:</p><ul><li>This is a beta, so it may break!</li><li>There are flashing lights and colours.</li><li>Make sure your battery is of reasonable charge as this performance does require the use of your phone.</li><li>This application is tested for modern versions of iOS Safari / Chrome, and Android Chrome. We can not guarantee functionality for all devices, OS versions, and browser versions. It is the modern web.</li><li>The phone is not required. We love music, and we fully understand if you just want to sit back and let the sound flow over your soul.</li></ul>");
}

controllers.tap = function($scope, $cookies, $location, Socket, Userset, CurrentPage) {
	timeApp.allfunc.firstvisit($cookies, $location, Userset, CurrentPage, Socket); //return to lobby if no cookie
	timeApp.communication.setupPageChange(Socket, $location, CurrentPage); //changepage on message
	$scope.id = Userset.ticket || $cookies.ticket;

	timeApp.tap.init(Socket);
	timeApp.communication.exitfunction = timeApp.tap.onexit;

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
	timeApp.communication.exitfunction = timeApp.shake.onexit;

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