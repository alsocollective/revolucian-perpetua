//Shake JS

document.addEventListener("DOMContentLoaded", function() {

	console.log("Shake JS Init");

	var test = document.getElementById("test");

	var mvgAvg = null;

	function handleMotionEvent(event) {

		console.log("Sensor Called");

		var x = event.accelerationIncludingGravity.x;
		var y = event.accelerationIncludingGravity.y;

		console.log("x:" + x + " y:" + y);

		if (x > 8) {
			test.innerHTML = "X: " + x + "<br/>Y: " + y;
		} else {
			test.innerHTML = "";
		}

		// test.innerHTML = "X: " + x + "<br/>Y: " + y;

		//mvgAvg = (z * 0.4) + (mvgAvg * (1 - 0.4));

		/*if ((Math.abs(mvgAvg - z)) > 6) {
			//emit tap with id
			console.log("true");
		} else {
			//do nothing
			console.log("false");
		}*/
	}

	window.addEventListener("devicemotion", handleMotionEvent, true);

});

/*
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

	function map255(percent, c1, c2, c) {
		return Math.floor(percent * (c2[c] - c1[c]) + c1[c])
	}
	socket.on('CP', function(data) {
		$location.path(data)
	});
}*/