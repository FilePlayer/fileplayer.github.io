"use strict";

(function() {

var that;

dom.screenVideo[ 0 ].crossOrigin = "anonymous";

api.video = that = {
	isStopped: true,
	isPlaying: false,

	play: function() {
		if ( !that.isPlaying ) {
			var file = api.playlist.selectedFile();
			if ( api.isLoaded || api.isLoading ) {
				that.isStopped = false;
				that.isPlaying = true;
				api.videoElement.play();
				ui.play();
			} else if ( file ) {
				api.playlist.select( file.element );
			} else {
				api.playlist.dialogueFiles();
			}
		}
		return that;
	},
	pause: function() {
		if ( that.isPlaying ) {
			that.isPlaying = false;
			api.videoElement.pause();
			ui.pause();
		}
		return that;
	},
	playToggle: function( b ) {
		if ( typeof b !== "boolean" ) {
			b = !that.isPlaying;
		}
		return b ? that.play() : that.pause();
	},
	stop: function() {
		if ( !that.isStopped ) {
			that
				.pause()
				.currentTime( 0 )
			;
			api.isLoaded =
			that.isPlaying = false;
			that.isStopped = true;
			dom.ctrlThumbnailVideo[ 0 ].pause();
			ui
				.canvasToggle( false )
				.stop()
			;
		}
		return that;
	},

	// Position: currentTime/duration.
	duration: function() {
		return !that.isStopped && api.videoElement.duration || 0;
	},
	currentTime: function( sec ) {
		if ( arguments.length === 0 ) {
			return api.videoElement.currentTime;
		}
		api.videoElement.currentTime = utils.range(
			0, sec,
			api.videoElement.duration,
			api.videoElement.currentTime
		);
		return that;
	},
	loop: function( b ) {
		if ( arguments.length === 0 ) {
			return api.videoElement.loop;
		}
		api.videoElement.loop = !!b;
		return that;
	},

	// Speed: playbackRate.
	playbackRate: function( rate ) {
		if ( arguments.length === 0 ) {
			return api.videoElement.playbackRate;
		}
		api.videoElement.playbackRate = rate;
		ui.speed( rate );
		return that;
	}
};

})();
