//Shake JS

document.addEventListener("DOMContentLoaded", function() {

	console.log("Shake JS Init");

	var test = document.getElementById("test");
	var back = document.getElementById("shake");

	var mvgAvgx = null;
	var mvgAvgy = null;

	var min = -800,
		max = 800,
		current = 0,
		counter = 0;

	var col = [
		[
			[200, 0, 255],
			[255, 255, 0]
		],
		[
			[255, 0, 0],
			[255, 0, 255]
		]
	];

	diffArr = [0, 0];

	console.log(col[0]);
	console.log(col[1]);


	function handleMotionEvent(event) {

		var x = event.accelerationIncludingGravity.x;

		mvgAvgx = (x * 0.4) + (mvgAvgx * (1 - 0.4));

		diffArr.shift();
		diffArr[diffArr.length] = current;

		current = (Math.floor(mvgAvgx.toFixed(2) * 1000));

		if (current < min && current < 8000) {
			min = current;
		} else if (current > max && current < 8000) {
			max = current;
		}

		if ((diff(diffArr[0], diffArr[1])) > 100) {
			back.style.backgroundColor = mapColour(current, min, max, col[0][0], col[0][1]);
			//Debug
			//test.innerHTML = "Cur: " + current + "<br/>x: " + x.toFixed(2) + "<br/>Min: " + min + " Max: " + max + "<br/>Diff: " + (diff(diffArr[0], diffArr[1])) + "<br/><br/>Col: " + (mapColour(current, min, max, col[0][0], col[0][1]));
		}

		//Touch Designer Data
		if (current > 5000) {
			if (current > max || current < min) {
				counter++
				test.innerHTML = "counter: " + counter;
			}
		}
	}
	window.addEventListener("devicemotion", handleMotionEvent, true);

	var goFS = document.getElementById("goFS");

	//VERY HACK FULLSCREEN FOR NOW
	/*goFS.onclick = function() {
		toggleFullScreen();
	};*/

});


//VERY HACK FULLSCREEN FOR NOW
/*function toggleFullScreen() {
	var doc = window.document;
	var docEl = doc.documentElement;

	var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
	var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

	if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
		requestFullScreen.call(docEl);
	} else {
		cancelFullScreen.call(doc);
	}
}*/

window.scrollTo(0, 1);

function diff(a, b) {
	return Math.abs(a - b);
}

function mapColour(cur, min, max, c1, c2) {
	var percent = (cur - min) / (max - min);
	return "rgb(" + map(percent, c1, c2, 0) + "," + map(percent, c1, c2, 1) + "," + map(percent, c1, c2, 2) + ")"
}

function map(percent, c1, c2, c) {
	return Math.floor(percent * (c2[c] - c1[c]) + c1[c])
}