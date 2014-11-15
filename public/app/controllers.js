var controllers = {};

timeApp.communication = {
	settings: {

	},
	setupbol: false,
	setup: function(Socket, Cookie, Userset) {
		if (timeApp.communication.setupbol) {
			return false;
		}
		timeApp.communication.setupbol = true;
		if (Cookie.ticket) {
			Userset.ticket = Cookie.ticket;
			Userset.getUserSub();
			Socket.emit("setID", Cookie.ticket);
		} else {
			Socket.emit("getID", "I have no id");
			Socket.on("setID", function(msg) {
				Userset.ticket = msg;
				Cookie.ticket = msg;
				Userset.getUserSub();
			})
		}

		//TODO retrive the what page the user is suppose to be on
		//should be pushed to the CurrentPage
		//be sure to run exit script when changing pages
	},
	test: function(Socket) {
		Socket.emit("ID");
		Socket.on("ID", function(msg) {
			console.log(msg);
		})
	},
	pageChange: false,
	exitfunction: null,
	setupPageChange: function(Socket, location, CurrentPage) {
		if (timeApp.communication.pageChange) {
			return false;
		}
		timeApp.communication.settings.socket = Socket;
		Socket.on("CP", function(msg) {
			timeApp.communication.pageExitFunction();
			location.path("/" + msg);
			CurrentPage.page = msg;
		})
		Socket.on("push", function(msg) {
			timeApp.communication.pageExitFunction();
			location.path("/song");
			CurrentPage.page = "song";
			CurrentPage.meta = msg;
		})
		Socket.on("meta", function(msg) {
			CurrentPage.meta = msg;
		})
		timeApp.communication.pageChange = true;
	},
	pageExitFunction: function() {
		if (timeApp.communication.exitfunction) {
			console.log("coms exit");
			timeApp.communication.exitfunction(timeApp.communication.settings.socket)
			timeApp.communication.exitfunction = null;
		}
	}
}


timeApp.allfunc = {
	firstvisit: function(cookie, location, Userset, CurrentPage,Socket) {
		if (!cookie.ticket) {
			location.path("/");
		} else if (location.path() == "/pushedpage" && (!CurrentPage.meta)) {
			location.path("/song")
		} else {
			console.log(location.path())
			Userset.ticket = cookie.ticket;
			Userset.getUserSub();
			Socket.emit("setID", cookie.ticket);			
		}
	}
}


controllers.lobby = function($scope, $cookies, $location, Socket, Userset, CurrentPage) {
	timeApp.communication.setup(Socket, $cookies, Userset); //setup initiall message
	timeApp.allfunc.firstvisit($cookies, $location, Userset, CurrentPage,Socket); //return to lobby if no cookie	
	timeApp.communication.setupPageChange(Socket, $location, CurrentPage); //changepage on message
	$scope.id = Userset.ticket || $cookies.ticket;
}

controllers.tap = function($scope, $cookies, $location, Socket, Userset, CurrentPage) {
	timeApp.allfunc.firstvisit($cookies, $location, Userset, CurrentPage,Socket); //return to lobby if no cookie
	timeApp.communication.setupPageChange(Socket, $location, CurrentPage); //changepage on message
	$scope.id = Userset.ticket || $cookies.ticket;


	if (timeApp.diagnostics) {
		timeApp.diagnostics.addTiltEventListener(Socket);
		// timeApp.communication.exitfunction = timeApp.diagnostics.onexit;
		timeApp.diagnostics.createDiagnosticButton(Socket);
	}
}

controllers.shake = function($scope, $cookies, $location, Socket, Userset, CurrentPage) {
	timeApp.allfunc.firstvisit($cookies, $location, Userset, CurrentPage,Socket); //return to lobby if no cookie
	timeApp.communication.setupPageChange(Socket, $location, CurrentPage); //changepage on message
	$scope.id = Userset.ticket || $cookies.ticket;
}


controllers.pushedpage = function($scope, $cookies, $location, Socket, Userset, CurrentPage) {
	timeApp.allfunc.firstvisit($cookies, $location, Userset, CurrentPage,Socket);
	timeApp.communication.setupPageChange(Socket, $location, CurrentPage); //changepage on message	
	$scope.id = Userset.ticket || $cookies.ticket;

	if (timeApp.pushedpage) {
		timeApp.pushedpage.init(CurrentPage);
		timeApp.communication.exitfunction = timeApp.pushedpage.onexit;
	}
}

controllers.newSong = function($scope, $cookies, $location, Socket, Userset, CurrentPage, SongSets) {
	timeApp.allfunc.firstvisit($cookies, $location, Userset, CurrentPage,Socket);
	timeApp.communication.setupPageChange(Socket, $location, CurrentPage); //changepage on message	
	$scope.id = Userset.ticket || $cookies.ticket;

	if (timeApp.newSong) {
		timeApp.newSong.init($scope, CurrentPage, SongSets, $location, Socket)
	}
}


controllers.admin = function($scope, $cookies, $location, Socket, Userset, CurrentPage) {
	timeApp.allfunc.firstvisit($cookies, $location, Userset, CurrentPage,Socket);
	$scope.id = Userset.ticket || $cookies.ticket;

	if (timeApp.cAdmin) {
		timeApp.cAdmin.init($scope, Socket);
	}
}


controllers.diagnostics = function($scope, $cookies, $location, Socket, Userset, CurrentPage) {
	timeApp.allfunc.firstvisit($cookies, $location, Userset, CurrentPage,Socket); //return to lobby if no cookie
	timeApp.communication.setupPageChange(Socket, $location, CurrentPage); //changepage on message
	$scope.id = Userset.ticket || $cookies.ticket;

	if (timeApp.diagnostics) {
		timeApp.communication.exitfunction = timeApp.diagnostics.onexit;
		timeApp.diagnostics.init(Socket);
	}
}

timeApp.controller(controllers);