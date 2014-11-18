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

		timeApp.modal.settings.close.onclick = timeApp.modal.close;
		timeApp.modal.settings.help.onclick = timeApp.modal.help;
	},
	close: function() {
		if (timeApp.modal.settings.modal == null) {
			return false;
		}
		timeApp.modal.settings.modal.className = "close";

		//Fullscreen
		var doc = window.document;
		var docEl = doc.documentElement;

		var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
		var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

		if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
			requestFullScreen.call(docEl);
		} else {
			cancelFullScreen.call(doc);
		}
	},
	help: function() {
		timeApp.modal.settings.modal.className = "";
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
		timeApp.modal.settings.content.innerHTML = text;
	}
}