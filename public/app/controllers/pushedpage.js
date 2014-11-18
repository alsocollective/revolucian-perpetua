timeApp.pushedpage = {
	settings: {
		j: 0,
		interval: null
	},
	init: function(CurrentPage) {
		if (!CurrentPage.meta) {
			return false;
		}
		var element = document.getElementById("content");
		// var song = CurrentPage.getMeta();


		for (i = 0; i < 10; i++) {
			var d = document.createElement("div");
			element.appendChild(d);
			d.style.visibility = "hidden";
			d.style.backgroundImage = "url(/public/content/" + song + "/" + i + ".png)";
			d.id = "s4-" + i;
		}

		timeApp.pushedpage.settings.interval = setInterval(function() {
			timeApp.pushedpage.myTimer()
		}, 150);
	},
	myTimer: function() {
		if (timeApp.pushedpage.settings.j < 9) {
			timeApp.pushedpage.settings.j++
		} else if (timeApp.pushedpage.settings.j === 9) {
			timeApp.pushedpage.settings.j = 0;
		}

		document.getElementById(("s4-" + timeApp.pushedpage.settings.j).toString()).style.visibility = "hidden";

		if (timeApp.pushedpage.settings.j + 1 === 10) {
			document.getElementById(("s4-0").toString()).style.visibility = "visible";
		} else {
			document.getElementById(("s4-" + (timeApp.pushedpage.settings.j + 1)).toString()).style.visibility = "visible";
		}
	},
	onexit: function() {
		window.clearInterval(timeApp.pushedpage.settings.interval);
	}
}