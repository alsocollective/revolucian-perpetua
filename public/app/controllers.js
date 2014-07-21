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

controllers.tapping = function($scope, socket, UserSet, $location, $timeout) {
	console.log("started tapping controller");

	$scope.socket = socket;

	var averageList = [0, 0, 0, 0, 0],
		avLength = averageList.length,
		average = 0,
		difference = 500,
		time = (new Date()).getTime(),
		arrayOfDiff = [],
		diffLength = avLength,
		diffAvg = 0,
		diffoffSet = 0;

	$scope.active = true;


	if (window.DeviceMotionEvent) {
		window.ondevicemotion = deviceTapDetect;
	}


	function deviceTapDetect(event, socket) {
		if (event.accelerationIncludingGravity.z) {
			var current = Math.floor(event.accelerationIncludingGravity.z * 1000);
			if ((average - current > 500 && average - current < 3000) && current < averageList[avLength]) {
				var nTime = (new Date()).getTime();
				if (nTime - time > 500) {
					var scope = angular.element(main_container).scope();
					scope.$apply(function() {
						scope.active = false;
						// console.log(scope.socket.on)
						scope.socket.emit('tapped', {
							"device": 233
						})
					})
					$timeout(function() {
						scope.$apply(function() {
							var scope = angular.element(main_container).scope();
						})
						scope.active = true;
					}, 50);
					time = nTime;
				}
			}
			//add new Value to array and remove oldest
			averageList.shift();
			averageList[avLength] = current;
			findAverage();
		}
	}

	$scope.triggerTapped = function() {
		var nTime = (new Date()).getTime();
		if (nTime - time > 300) {
			$scope.active = false;
			socket.emit('tapped', {
				"device": 233
			})
			$timeout(function() {
				$scope.active = true;
			}, 50);
			time = nTime;
		}
	}

	function findAverage() {
		var a = 0,
			preAv = average,
			diffadding = 0;

		average = 0,
		difference = 0;
		for (a = 0; a < avLength; ++a) {
			average += averageList[a];
			difference += preAv - averageList[a]
			diffadding += arrayOfDiff[a];
		}
		difference = Math.floor(difference / avLength);
		average = Math.floor(average / avLength);

		arrayOfDiff.shift();
		arrayOfDiff[diffLength] = difference;
		diffAvg = Math.floor(diffadding / diffLength)
		diffoffSet = difference - diffAvg


		if (!average) {
			average = 0;
		}
	}

	$scope.$on("$destroy", function() {
		window.ondevicemotion = null;
	});

}

controllers.login = function($scope, socket, UserSet, $location) {
	$scope.loginInfo = {}
	$scope.loginInfo.username = "Your Name";
	$scope.loginInfo.ticket = "000"
	$scope.addUser = function() {
		console.log($scope.loginInfo.username, $scope.loginInfo.ticket);

		$location.path('/lobby');
	}

	socket.on('CP', function(data) {
		$location.path(data)
	})
}

controllers.lobby = function($scope, socket, UserSet, $location) {

	$scope.timer = {}

	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1; //January is 0!
	var yyyy = today.getFullYear();
	var startTime = "16:08:00";

	var target_date = new Date(mm + " " + dd + ", " + yyyy + ", " + startTime).getTime();
	var hours, minutes, seconds;
	var timer = document.getElementById("timer");

	console.log("You've reached the LOBBY!");

	$('.autoplay').slick({
		dots: false,
		arrows: false,
		infinite: true,
		speed: 300,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000
	});

	var timerId = setInterval(function() {

		var current_date = new Date().getTime();
		var seconds_left = (target_date - current_date) / 1000;

		hours = parseInt(seconds_left / 3600);
		seconds_left = seconds_left % 3600;

		minutes = parseInt(seconds_left / 60);
		seconds = parseInt(seconds_left % 60);

		timer.innerHTML = ("0" + hours).slice(-2) + " : " + ("0" + minutes).slice(-2) + " : " + ("0" + seconds).slice(-2);

		if (hours <= 0 && minutes <= 0 && seconds <= 0) {

			timer.innerHTML = "00 : 00 : 00";
			console.log("PARTY TIME!");

			showStart();

		}
	}, 1000);

	var showStart = function() {

		$location.path('/tapping');
		/*window.location.href = "/#/tapping";*/ //This is wrong!
		//$location.replace();
		clearInterval(timerId);
	}

	socket.on('CP', function(data) {
		$location.path(data)
	})
}

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
		//$location.path(data);
	})
}

timeApp.controller(controllers);