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

	socket.on('CP', function(data) {
		$location.path(data)
	})

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

controllers.login = function($scope, socket, UserSet, $location) {
	$scope.loginInfo = {}
	$scope.addUser = function() {
		console.log($scope.loginInfo.fname, $scope.loginInfo.ticket);

		$location.path('/tapping');

		// SEND TO LOBBY
	}

	socket.on('CP', function(data) {
		$location.path(data)
	})
}

// WE NEED A LOBBY FUNCTION

controllers.admin = function($scope, socket, UserSet, $location) {
	$scope.userID = UserSet.user;
	$scope.msg = {
		"id": "repeat",
		"header": "CP",
		"msg": "/"
	}

	$scope.sendMsg = function() {
		socket.emit($scope.msg.id, {
			"header": $scope.msg.header,
			"msg": $scope.msg.msg
		})
		// console.log($scope.msg.id, $scope.msg.msg)
	}

	socket.on('CP', function(data) {
		console.log("got: " + data)
		// $location.path(data);
	})
}

timeApp.controller(controllers);