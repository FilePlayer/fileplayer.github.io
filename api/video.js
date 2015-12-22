(function() {

var
	that,
	oldSource,
	isStopped = true,
	isLoaded = false,
	opacity = 1,
	video = dom.jqPlayerVideo[ 0 ],
	jqVideo = dom.jqPlayerVideo,
	jqVideoThumb = dom.jqPlayerThumbnailVideo
;

api.video = that = {

	// Manipulating the src="" attribute.
	unLoad: function() {
		isLoaded = false;
		jqVideo.add( jqVideoThumb ).attr( "src", "" );
		return that;
	},
	load: function( url ) {
		isLoaded = !!url;
		oldSource = url;
		jqVideo.add( jqVideoThumb ).attr( "src", url );
		return that;
	},
	loaded: function() {
		that.ratio = video.videoWidth / video.videoHeight
		return that.resizeUpdate();
	},

	// Dimensions:
	resizeUpdate: function() {
		var
			r = that.ratio,
			w = that.elementWidth  = jqVideo.width(),
			h = that.elementHeight = jqVideo.height(),
			rElem = w / h
		;
		that.imageWidth  = r > rElem ? w : h * r;
		that.imageHeight = r < rElem ? h : w / r;
		playerUI.subtitlesResizeUpdate();
		return that;
	},

	// Playing: play/pause/stop.
	play: function() {
		if ( !that.isPlaying() ) {
			if ( !isLoaded ) {
				that.load( oldSource );
			}
			if ( isLoaded ) {
				isStopped = false;
				video.play();
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
		if ( typeof b !== "boolean" ) {
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

})();
