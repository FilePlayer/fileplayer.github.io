"use strict";

(function() {

dom.doc.on(
	      "fullscreenchange " +
	    "MSFullscreenChange " +
	   "mozfullscreenchange " +
	"webkitfullscreenchange",
	function() {
		lg( "ON: fullscreenchange" );
		playerUI.toggleFullscreen( document.isFullscreen() );
	}
);

dom.window.resize( function() {
	// Be careful with changing this order:
	api.screen.resize();
	playlistUI.resize();
	api.screen.resizeFilename();
	api.visualisations.resize();
	playerUI.subtitlesResizeUpdate();
});

dom.screenVideo.on( {
	loadedmetadata: function() {
		lg( "ON: loadedmetadata" );
		api.video.loaded();
		playerUI.loaded();
	},
	waiting: function() {
		lg( "ON: waiting" );
		playerUI.seeking();
	},
	seeked: function() {
		lg( "ON: seeked" );
		playerUI.seeked();
	},
	durationchange: function() {
		lg( "ON: durationchange" );
		playerUI.duration( this.duration );
	},
	timeupdate: function() {
		playerUI
			.seeked()
			.currentTime( this.currentTime )
		;
	},
	ratechange: function() {
		lg( "ON: ratechange" );
		playerUI.speed( this.playbackRate );
	},
	brightnesschange: function() {
		lg( "ON: brightnesschange" );
		playerUI.brightness( api.screen.brightness() );
	}
});

})();
