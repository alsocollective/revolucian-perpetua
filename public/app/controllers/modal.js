timeApp.modal = {
	settings: {
		close: null,
		modal: null,
		help: null,
		content: null
	},
	init: function() {
		timeApp.modal.settings.close = document.getElementById("xx");
		timeApp.modal.settings.modal = document.getElementById("modal");
		timeApp.modal.settings.help = document.getElementById("help");
		timeApp.modal.settings.content = document.getElementById("modal-content");
		//timeApp.modal.settings.endless = document.getElementById("endless");

		timeApp.modal.settings.close.onclick = timeApp.modal.close;
		timeApp.modal.settings.help.onclick = timeApp.modal.help;

		timeApp.modal.settings.modal.className = "fade-in";
	},
	close: function() {
		if (timeApp.modal.settings.modal == null) {
			return false;
		}
		// timeApp.modal.settings.help.className = "";
		timeApp.modal.settings.help.style.display = "";
		timeApp.modal.settings.help.className = "pop-in";
		timeApp.modal.settings.modal.className = "fade-out";

		setTimeout(function() {
			timeApp.modal.settings.modal.style.display = "none";
		}, 900);


		//Fullscreen
		/*var doc = window.document;
		var docEl = doc.documentElement;

		var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
		var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

		if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
			requestFullScreen.call(docEl);
		} else {
			cancelFullScreen.call(doc);
		}*/

		var stayAwake = setInterval(function() {
			location.href = location.href; //try refreshing
			window.setTimeout(window.stop, 0); //stop it soon after
			console.log("TIME");
		}, 30000);

		// console.log(timeApp.modal.settings.endless);

		// timeApp.modal.settings.endless.play();

	},
	help: function() {
		timeApp.modal.settings.help.className = "pop-out";
		setTimeout(function() {
			timeApp.modal.settings.help.style.display = "none";
		}, 500)
		timeApp.modal.settings.modal.style.display = "";
		timeApp.modal.settings.modal.className = "fade-in";
	},
	setTextHidden: function(text) {
		if (timeApp.modal.settings.modal == null) {
			timeApp.modal.init();
		}
		timeApp.modal.settings.modal.className = "close";
		timeApp.modal.settings.content.innerHTML = text;
	},
	alert: function(text) {
		if (timeApp.modal.settings.modal == null) {
			timeApp.modal.init();
		}
		timeApp.modal.settings.modal.className = "";
		timeApp.modal.settings.modal.className = "fade-in";
		timeApp.modal.settings.content.innerHTML = text;
	}
}