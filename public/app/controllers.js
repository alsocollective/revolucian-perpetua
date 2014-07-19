var controllers = {},
	scope = null;

controllers.sync = function($scope, $location, socket, UserSet) {
	console.log("strted sync");
	socket.on('setup', function(data) {
		console.log("get setup...")
		console.log(data.msg);
		$scope.message = data.msg;
		$location.path('/tapping');
	});

	socket.on('CP', changePage)

}

function changePage(newPage) {
	$location.path('/' + newPage.page);
}

controllers.selectColours = function($scope, socket) {

}

controllers.tapping = function($scope, socket) {
	console.log("strted gyro");
	scope = $scope;
	var ax = 0,
		ay = 0,
		az = 0;
	if (window.DeviceMotionEvent) {
		window.ondevicemotion = function(event) {
			if (ax < event.accelerationIncludingGravity.x - 1 || ax > event.accelerationIncludingGravity.x + 1 || ay < event.accelerationIncludingGravity.y - 1 || ay > event.accelerationIncludingGravity.y + 1) {
				ax = event.accelerationIncludingGravity.x;
				ay = event.accelerationIncludingGravity.y;
				console.log(Math.floor(ax * 100) + " " + Math.floor(ay * 100))
				socket.emit("msg", (ax.toString() + " " + ay.toString()));
				scope.message = (Math.floor(ax * 100) + " " + Math.floor(ay * 100));
			}
		}
	}

	// $scope.$on("$destroy", function(event, data) {
	// 	console.log("EXITING this state");
	// 	console.log(event);
	// 	console.log(data);
	// })
}

controllers.login = function($scope, socket, UserSet) {
	$scope.loginInfo = {}
	$scope.addUser = function() {
		console.log($scope.loginInfo.fname,$scope.loginInfo.ticket);
	}
}

controllers.admin = function($scope, socket, UserSet) {
	$scope.userID = UserSet.user;
}

timeApp.controller(controllers);