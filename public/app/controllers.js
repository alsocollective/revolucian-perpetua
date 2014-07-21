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

controllers.tapping = function($scope, socket, UserSet, $location) {
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
				console.log(Math.floor(ax * 100) + " " + Math.floor(ay * 100));
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
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	var startTime = "16:08:00";

	var target_date = new Date(mm+" "+dd+", "+yyyy+", "+startTime).getTime();
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

	var timerId = setInterval(function () {
	 
	    var current_date = new Date().getTime();
	    var seconds_left = (target_date - current_date) / 1000;
	 	     
	    hours = parseInt(seconds_left / 3600);
	    seconds_left = seconds_left % 3600;
	     
	    minutes = parseInt(seconds_left / 60);
	    seconds = parseInt(seconds_left % 60);

	    timer.innerHTML = ("0" + hours).slice(-2)+" : "+("0" + minutes).slice(-2)+" : "+("0" + seconds).slice(-2);

	    if(hours <= 0 && minutes <= 0 && seconds <= 0) {

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

	socket.on('CP', function(data) {$location.path(data)})
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