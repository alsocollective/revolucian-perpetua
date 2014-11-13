timeApp.newSong = {
	settings: {},
	init: function(scope, CurrentPage, SongSets, location, Socket) {
		timeApp.newSong.settings.scope = scope;
		timeApp.newSong.settings.currentPage = CurrentPage;
		timeApp.newSong.settings.songSets = SongSets;
		timeApp.newSong.settings.location = location;

		if (!CurrentPage.meta) {
			console.log("there was not meta content...")
			Socket.emit("getmeta", "", timeApp.newSong.callbackinit);
			return false;
		}
		timeApp.newSong.setup(scope, CurrentPage, SongSets, location);
	},
	setup: function(scope, CurrentPage, SongSets, location) {
		console.log(CurrentPage)
		scope.song = SongSets.songs[CurrentPage.meta].title;
		scope.nextpage = function() {
			timeApp.newSong.settings.location.path("/pushedpage");
		}
	},
	callbackinit: function(msg) {
		timeApp.newSong.settings.currentPage.meta = msg;
		timeApp.newSong.setup(timeApp.newSong.settings.scope, timeApp.newSong.settings.currentPage, timeApp.newSong.settings.songSets, timeApp.newSong.settings.location);
	},
	onexit: function() {

	}
}