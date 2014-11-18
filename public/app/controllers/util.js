timeApp.communication = {
	settings: {
		setupbol: false,
		pageChange: false,
		socket: null,
		location: null,
		currentPage: null
	},

	setup: function(Socket, Cookie, Userset, location, CurrentPage) {
		if (timeApp.communication.settings.setupbol) {
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

		timeApp.communication.settings.setupbol = true;

		timeApp.communication.settings.socket = Socket;
		timeApp.communication.settings.location = location;
		timeApp.communication.settings.currentPage = CurrentPage;

		if (location.path() == "/admin") {
			return false;
		}
		timeApp.communication.setupPageChange(Socket, location, CurrentPage);

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
	exitfunction: null,
	setupPageChange: function(Socket, location, CurrentPage) {
		if (timeApp.communication.settings.pageChange) {
			return false;
		}
		timeApp.communication.settings.socket = Socket;
		Socket.on("CP", timeApp.communication.changePage)

		Socket.on("meta", function(msg) {
			CurrentPage.meta = msg;
		})


		// make sure everything is set correctly...
		timeApp.communication.checkforupdates();

		// Socket.on("push", function(msg) {
		// 	timeApp.communication.pageExitFunction();
		// 	location.path("/song");
		// 	CurrentPage.page = "song";
		// 	CurrentPage.meta = msg;
		// })		
		timeApp.communication.settings.pageChange = true;
	},
	changePage: function(msg) {
		console.log("changePage: " + msg);
		if (timeApp.communication.settings.currentPage.page != msg || timeApp.communication.settings.location.path() != ("/" + msg)) {
			timeApp.communication.pageExitFunction();
			timeApp.communication.settings.location.path("/" + msg);
		}
		timeApp.communication.settings.currentPage.page = msg;
	},
	checkforupdates: function() {
		timeApp.communication.settings.socket.emit("getmeta");
		timeApp.communication.settings.socket.emit("getpage");
	},

	pageExitFunction: function() {
		if (timeApp.communication.exitfunction) {
			timeApp.communication.exitfunction(timeApp.communication.settings.socket)
			timeApp.communication.exitfunction = null;
		}
	}
}


timeApp.allfunc = {
	firstvisit: function(cookie, location, Userset, CurrentPage, Socket) {
		timeApp.modal.close();
		if (!cookie.ticket || !Userset.ticket) {
			location.path("/");
			Userset.ticket = cookie.ticket;
			Userset.getUserSub();
			Socket.emit("setID", cookie.ticket);
			/*} else if (location.path() == "/pushedpage" && (!CurrentPage.meta)) {
			location.path("/song")*/
		} else {
			console.log("user already has a ticket")
			// console.log(location.path())

		}
	}
}