(function() {

dom.jqDoc.on(
	      "fullscreenchange " +
	    "MSFullscreenChange " +
	   "mozfullscreenchange " +
	"webkitfullscreenchange",
	function() {
		lg( "ON: fullscreenchange" );
		playerUI.toggleFullscreen( document.isFullscreen() );
	}
);

dom.jqPlayerVideo.on( {
	loadedmetadata: function() {
		lg( "ON: loadedmetadata" );
		playerUI.loaded();
	},
	play: function() {
		lg( "ON: play" );
		playerUI.play();
	},
	pause: function() {
		lg( "ON: pause" );
		playerUI.pause();
	},
	stop: function() {
		lg( "ON: stop" );
		playerUI.stop();
	},
	durationchange: function() {
		lg( "ON: durationchange" );
		playerUI.duration( this.duration );
	},
	timeupdate: function() {
		lg( "ON: timeupdate" );
		playerUI.currentTime( this.currentTime );
	},
	volumechange: function() {
		lg( "ON: volumechange" );
		playerUI.volume( this.muted ? 0 : this.volume );
	},
	ratechange: function() {
		lg( "ON: ratechange" );
	},
	opacitychange: function() {
		lg( "ON: opacitychange" );
		playerUI.opacity( api.video.opacity() );
	}
});

})();