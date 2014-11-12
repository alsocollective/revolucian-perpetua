//Tap JS

document.addEventListener("DOMContentLoaded", function() {

	var close = document.getElementById("xx");
	var bg = document.getElementById("tap");
	var modal = document.getElementById("modal");

	close.onclick = function() {
		modal.className = "close";
	};

	console.log("Tap JS Init");

	var mvgAvg = null;

	function handleMotionEvent(event) {

		// console.log("Sensor Called");

		var z = event.accelerationIncludingGravity.z;

		mvgAvg = (z * 0.4) + (mvgAvg * (1 - 0.4));

		//console.log(Math.abs(mvgAvg - z));

		if ((Math.abs(mvgAvg - z)) > 6) {
			//emit tap with id
			// console.log("true");
			if (user === "red") {
				bg.className = "bgRed";
			} else {
				bg.className = "bgWhite";
			}

			// ADD INTO HTML AND CHANGE STYLES ETC

			// console.log("TRUUUUUUUE");
		} else {
			//do nothing
			bg.className = "";
			// console.log("false");
		}
	}

	window.addEventListener("devicemotion", handleMotionEvent, true);

});