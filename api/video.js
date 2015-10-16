(function() {

var
	that,
	oldSource,
	opacity = 1,
	video = dom.jqPlayerVideo[ 0 ],
	jqVideo = dom.jqPlayerVideo,
	jqVideoThumb = dom.jqPlayerThumbnailVideo
;

api.video = that = {

	// Manipulating the src="" attribute.
	getSource: function() {
		return jqVideo.attr( "src" );
	},
	setSource: function( src ) {
		jqVideo.attr( "src", src );
		jqVideoThumb.attr( "src", src );
		return that;
	},

	// Playing: play/pause/stop.
	play: function() {
		if ( that.isStopped() && oldSource ) {
			that.setSource( oldSource );
		}
		if ( that.getSource() ) {
			video.play();
		}
		return that;
	},
	pause: function() {
		video.pause();
		return that;
	},
	isPlaying: function() {
		return !video.paused;
	},
	isStopped: function() {
		return video.paused && !video.currentTime;
	},
	playToggle: function( b ) {
		if ( arguments.length === 0 ) {
			b = !that.isPlaying();
		}
		return b ? that.play() : that.pause();
	},
	stop: function() {
		var src = that.getSource();
		if ( src ) {
			that.setSource( "" );
			oldSource = src;
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

	// Sound: volume/mute/unMute
	volume: function( vol ) {
		if ( arguments.length === 0 ) {
			return video.volume;
		}
		if ( video.volume = utils.range( 0, vol, 1, video.volume ) ) {
			video.muted = false;
		}
		return that;
	},
	mute: function() {
		video.muted = true;
		return that;
	},
	unMute: function() {
		video.muted = false;
		if ( video.volume === 0 ) {
			video.volume = 1;
		}
		return that;
	},
	isMuted: function() {
		return video.muted || video.volume === 0;
	},
	muteToggle: function( b ) {
		if ( arguments.length === 0 ) {
			b = !that.isMuted();
		}
		return b ? that.mute() : that.unMute();
	},

	// Speed: playbackRate.
	playbackRate: function( rate ) {
		if ( arguments.length === 0 ) {
			return video.playbackRate;
		}
		video.playbackRate = rate;
		return that;
	},

	// Brightness: opacity.
	opacity: function( o ) {
		if ( arguments.length === 0 ) {
			return opacity;
		}
		if ( opacity = utils.range( 0, o, 1, opacity ) ) {
			jqVideo.trigger( "opacitychange" );
		}
		return that;
	}
};

// The videoElement has no "stop" event.
// But this API has a .stop() methode anyway, this methode trigger("stop").
jqVideo.on( "ended", api.video.stop );

})();
