timeApp.modal = {
	settings: {
		close: null,
		modal: null,
		help: null,
		content: null,
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
	},
	help: function() {
		timeApp.modal.settings.modal.className = "";
	},
	alert: function(text) {
		if (timeApp.modal.settings.modal == null) {
			timeApp.modal.init();
		}
		timeApp.modal.settings.modal.className = "";
		timeApp.modal.settings.content.innerHTML = text;
	}
}