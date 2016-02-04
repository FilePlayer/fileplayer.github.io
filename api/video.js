"use strict";

(function() {

var
	that,
	oldSource,
	isStopped = true,
	isLoaded = false,
	isLoading = false,
	video = dom.screenVideo[ 0 ],
	jqVideo = dom.screenVideo,
	jqVideoThumb = dom.ctrlThumbnailVideo
;

api.video = that = {

	// Manipulating the src="" attribute.
	unLoad: function() {
		isLoaded = false;
		jqVideo.attr( "src", "" );
		if ( api.playlist.selectedFile().type === "video" ) {
			jqVideoThumb.attr( "src", "" );
		}
		return that;
	},
	load: function( url ) {
		oldSource = url;
		jqVideo.attr( "src", url );
		jqVideoThumb.attr( "src", api.playlist.selectedFile().type === "video" ? url : "" );
		isLoading = true;
		return that;
	},
	loaded: function() {
		isLoaded = true;
		isLoading = false;
		that.ratio = video.videoWidth / video.videoHeight
		api.screen.resize();
		playerUI.subtitlesResizeUpdate();
		return that;
	},

	// Playing: play/pause/stop.
	play: function() {
		if ( !that.isPlaying() ) {
			var file = api.playlist.selectedFile();
			if ( isLoaded || isLoading ) {
				isStopped = false;
				video.play();
			} else if ( file ) {
				api.playlist.select( file.element );
			} else {
				api.playlist.dialogueFiles();
			}
		}
		return that;
	},
	pause: function() {
		if ( that.isPlaying() ) {
			video.pause();
		}
		return that;
	},
	isPlaying: function() {
		return !isStopped && !video.paused;
	},
	isStopped: function() {
		return isStopped;
	},
	playToggle: function( b ) {
		if ( typeof b !== "boolean" ) {
			b = !that.isPlaying();
		}
		return b ? that.play() : that.pause();
	},
	stop: function() {
		if ( !isStopped ) {
			isStopped = true;
			that.unLoad( "" );
			jqVideo.trigger( "stop" );
		}
		return that;
	},

	// Position: currentTime/duration.
	duration: function() {
		return video.duration || 0;
	},
	currentTime: function( sec ) {
		if ( arguments.length === 0 ) {
			return video.currentTime;
		}
		video.currentTime = utils.range(
			0, sec,
			video.duration,
			video.currentTime
		);
		return that;
	},

	// Speed: playbackRate.
	playbackRate: function( rate ) {
		if ( arguments.length === 0 ) {
			return video.playbackRate;
		}
		video.playbackRate = rate;
		return that;
	}
};

})();
