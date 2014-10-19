//Tap JS

document.addEventListener("DOMContentLoaded", function() {

	console.log("Tap JS Init");

	var mvgAvg = null;

	function handleMotionEvent(event) {

		console.log("Sensor Called");

		var z = event.accelerationIncludingGravity.z;

		mvgAvg = (z * 0.4) + (mvgAvg * (1 - 0.4));

		if ((Math.abs(mvgAvg - z)) > 6) {
			//emit tap with id
			console.log("true");
		} else {
			//do nothing
			console.log("false");
		}
	}

	window.addEventListener("devicemotion", handleMotionEvent, true);

});