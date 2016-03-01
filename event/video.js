"use strict";

dom.screenVideo.on( {
	loadedmetadata: function() {
		lg( "ON: loadedmetadata" );
		api.video.loaded();
		ui.loaded();
	},
	waiting: function() {
		lg( "ON: waiting" );
		ui.seeking();
	},
	seeked: function() {
		lg( "ON: seeked" );
		ui.seeked();
	},
	durationchange: function() {
		lg( "ON: durationchange" );
		ui.duration( this.duration );
	},
	timeupdate: function() {
		ui
			.seeked()
			.currentTime( this.currentTime )
		;
	},
	ratechange: function() {
		lg( "ON: ratechange" );
		ui.speed( this.playbackRate );
	}
});
