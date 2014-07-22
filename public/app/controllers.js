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

controllers.swipe = function($scope, socket, $location, $timeout) {

	$scope.users = ["@SamiraAhmed", "@NerminAl-Fiqy", "@LobnaAbdelAziz", "@DaliaElBehery", "@Bushra", "@IlhamChahine", "@MimiChakib"] //, "@AssiaDagher", "@NabilaEbeid", "@MariamFakhrEddine", "@RehamAbdElGhafour", "@LailaElwi", "@NaglaaFathi", "@Feyrouz", "@SanaaGamil", "@FatenHamama", "@SuadHusni", "@YosraElLozy", "@NadiaLutfi", "@FerdoosMohammed", "@LeilaMourad", "@Nadine[disambiguationneeded]", "@SuadNasr", "@MaryQueeny", "@GehanRateb", "@AminaRizk", "@HendRostom", "@HalaSedki", "@Shadia", "@Sherihan", "@Shwikar", "@HananTork", "@Yousra", "@MonaZaki"]

	$timeout(function() {
		jQuery(".usersswippe").slick({
			dots: false,
			arrows: false,
			infinite: false,
			speed: 300,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: false,
			autoplaySpeed: 2000
		});
	});

	socket.on('CP', function(data) {
		$location.path(data)
	});
}

controllers.shaker = function($scope, socket, UserSet, $location) {

	$scope.colourSelect = {}
	$scope.active = true;

	$scope.controls = false;

	//$scope.colourSelect

	$scope.colourSelect.colour1 = null;
	$scope.colourSelect.colour2 = null;

	var colour1 = [50, 50, 50];
	var colour2 = [50, 50, 50];

	console.log("Get Shak'n");

	$scope.addColour1 = function(value) {
		console.log("colour1 " + value);
		$scope.colourSelect.colour1 = value;
		checker();
	}
	$scope.addColour2 = function(value) {
		console.log("colour2 " + value);
		$scope.colourSelect.colour2 = value;
		checker();
	}

	function checker() {
		if ($scope.colourSelect.colour2 != null && $scope.colourSelect.colour1 != null) {
			console.log("success");
			
			//document.getElementById("colorSelector").remove();

			$scope.controls = true;

			var array1 = $scope.colourSelect.colour1.split(',').map(Number);
			var array2 = $scope.colourSelect.colour2.split(',').map(Number);

			colour1 = array1;
			colour2 = array2;
			screenfull.request();
		}
	}

	if (window.DeviceMotionEvent) {
		var min = 0,
			max = 0,
			current = 0;

		//output.style.color = [255,255,255];

		console.log(colour1);
		window.ondevicemotion = function(event) {
			if (event.accelerationIncludingGravity.z) {
				//real it back in...
				min += 50;
				max -= 50;
				current = (Math.floor(event.accelerationIncludingGravity.x * 1000));
				if (current < min) {
					min = current;
				} else if (current > max) {
					max = current;
				}
				output.style.backgroundColor = mapColour(current, min, max, colour1, colour2);
				output.style.color = mapColour(current, min, max, colour2, colour1);
			}
		}
	}

	function mapColour(cur, min, max, c1, c2) {
		var percent = (cur - min) / (max - min);
		return "rgb(" + map255(percent, c1, c2, 0) + "," + map255(percent, c1, c2, 1) + "," + map255(percent, c1, c2, 2) + ")"
	}

	function map255(percent,c1,c2,c){
		return Math.floor(percent*(c2[c]-c1[c])+c1[c])
	}
	socket.on('CP', function(data) {$location.path(data)});
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
							"device": 10
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
				"device": 11
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
	socket.on('CP', function(data) {
		$location.path(data)
	});

}


//LOGIN PAGE
controllers.login = function($scope, socket, UserSet, $location) {

	//Set default value of text input
	$scope.ticket = 123;
	$scope.active = true;
	
	//Called by Submit Input
	$scope.addUser = function() {
		console.log($scope.ticket.length);
		$location.path('/lobby');
	}

	//Keep checking the field whenever there is input
	$scope.changeLength = function() {
		if($scope.ticket.length > 2){
			$scope.active = false;
		}else{
			$scope.active = true;
		}
    };
	socket.on('CP', function(data) {$location.path(data)});
}

controllers.lobby = function($scope, socket, UserSet, $location) {

	var scope = angular.element(main_container).scope();

	scope.countdown = "00 : 00 : 00";

	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1; //January is 0!
	var yyyy = today.getFullYear();
	var startTime = "23:08:00";

	var target_date = new Date(mm + " " + dd + ", " + yyyy + ", " + startTime).getTime();
	var hours, minutes, seconds;
	var timer = document.getElementById("timer");

	console.log("You've reached the LOBBY!");

	$('.autoplay').slick({
		dots: false,
		arrows: false,
		infinite: true,
		speed: 200,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000
	});

	var timerId = setInterval(function() {

		var current_date = new Date().getTime();
		var seconds_left = (target_date - current_date) / 1000;

		hours = parseInt(seconds_left / 3600);
		seconds_left = seconds_left % 3600;

		minutes = parseInt(seconds_left / 60);
		seconds = parseInt(seconds_left % 60);

		scope.$apply(function() {
			scope.countdown = ("0" + hours).slice(-2) + " : " + ("0" + minutes).slice(-2) + " : " + ("0" + seconds).slice(-2);;
		})

		if (hours <= 0 && minutes <= 0 && seconds <= 0) {

			timer.innerHTML = "00 : 00 : 00";

			clearInterval(timerId);
		}
	}, 1000);

	socket.on('CP', function(data) {
		$location.path(data)
	});
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