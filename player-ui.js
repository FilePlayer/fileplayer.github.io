(function() {

var
	that,

	// Video.
	jqVideo = dom.jqPlayerVideo,

	// Button: play/pause.
	jqPlayBtn = dom.jqPlayerPlayBtn,

	// Button, slider: volume.
	jqVolumeIcon = dom.jqPlayerVolumeIcon,
	jqVolumeSlider = dom.jqPlayerVolumeSlider,
	jqVolumeSliderParent = jqVolumeSlider.parent(),

	// Texts, slider: position/duration.
	jqTimeTxtCurrent = dom.jqPlayerTimeCurrent,
	jqTimeTxtRemaining = dom.jqPlayerTimeRemaining,
	jqTimeTxtDuration = dom.jqPlayerTimeDuration,
	jqTimeSlider = dom.jqPlayerSliderCurrentTime,
	jqTimeSliderParent = jqTimeSlider.parent(),

	// Button: fullscreen.
	jqBtnFScr = dom.jqPlayerFullscreenBtn,

	// Button, slider: opacity.
	jqOpacityIcon = dom.jqPlayerOpacityIcon,
	jqOpacitySlider = dom.jqPlayerOpacitySlider,
	jqOpacitySliderParent = jqOpacitySlider.parent(),

	// Subtitles.
	currentCue,
	jqSubtitlesCue = dom.jqPlayerCue,
	jqSubtitlesBtn = dom.jqPlayerSubtitlesBtn,

	// Texts: texts on screen.
	jqScreenTexts = [
		dom.jqPlayerTitle,
		dom.jqPlayerShortcutDesc
	],
	screenTextsTimeoutIds = []
;

function volStr( vol ) {
	return "Volume : " + Math.round( vol * 100 ) + " %";
}

function screenTexts( i, msg ) {
	clearTimeout( screenTextsTimeoutIds[ i ] );

	jqScreenTexts[ i ]
		.text( msg )
		.removeClass( "hidden" )
	;

	// Start to fadeout the element after 2s.
	screenTextsTimeoutIds[ i ] = setTimeout( function() {
		jqScreenTexts[ i ].addClass( "hidden" );
	}, 2000 );
}

window.playerUI = that = {
	title: function( msg ) {
		screenTexts( 0, msg );
		return that;
	},
	actionDesc: function( msg ) {
		screenTexts( 1, msg );
		return that;
	},
	loaded: function() {
		jqTimeSliderParent.attr( "data-tooltip-content", null );
		api.thumbnail.canvas.drawFromImg();
		api.thumbnail.cache.init( Math.ceil( api.video.duration() ) );
		return that;
	},
	fullscreen: function() {
		document.fullscreen( document.documentElement );
		jqBtnFScr
			.removeClass( "fa-expand" )
			.addClass( "fa-compress" )
			.attr( "data-tooltip-content", "Exit full screen" )
		;
		return that;
	},
	exitFullscreen: function() {
		document.exitFullscreen();
		jqBtnFScr
			.removeClass( "fa-compress" )
			.addClass( "fa-expand" )
			.attr( "data-tooltip-content", "Full screen" )
		;
		return that;
	},
	toggleFullscreen: function( b ) {
		if ( arguments.length === 0 ) {
			b = !document.isFullscreen();
		}
		return b ? that.fullscreen() : that.exitFullscreen();
	},
	play: function() {
		dom.jqPlayer.addClass( "cinema" );
		jqPlayBtn
			.removeClass( "fa-play" )
			.addClass( "fa-pause" )
			.attr( "data-tooltip-content", "Pause" )
		;
		return that;
	},
	pause: function() {
		jqPlayBtn
			.removeClass( "fa-pause" )
			.addClass( "fa-play" )
			.attr( "data-tooltip-content", "Play" )
		;
		return that;
	},
	stop: function() {
		dom.jqPlayer.removeClass( "cinema" );
		api.thumbnail.canvas.drawFromImg();
		jqTimeSliderParent.attr( "data-tooltip-content", null );
		return that
			.pause()
			.currentTime( 0 )
			.duration( 0 )
		;
	},
	currentTime: function( sec ) {
		var dur = api.video.duration();
		that.subtitlesCue( api.subtitles.findCue() );
		jqTimeSlider.element().val( sec / dur );
		jqTimeTxtCurrent.text( utils.secondsToString( sec ) );
		jqTimeTxtRemaining.text( utils.secondsToString( dur - sec ) );
		return that;
	},
	duration: function( sec ) {
		jqTimeTxtDuration.text( utils.secondsToString( sec ) );
		return that;
	},
	volume: function( vol ) {
		jqVolumeIcon
			.removeClass( "fa-volume-off fa-volume-down fa-volume-up" )
			.addClass(
				!vol
					? "fa-volume-off"
					: vol < .5
						? "fa-volume-down"
						: "fa-volume-up"
			)
		;
		jqVolumeSlider.element().val( vol );
		jqVolumeIcon.attr( "data-tooltip-content", vol ? "Mute" : "Unmute" );
		jqVolumeSliderParent.attr( "data-tooltip-content", volStr( vol ) );
		return that;
	},
	opacity: function( op ) {
		jqVideo.css( "opacity", op );
		jqOpacitySlider.element().val( op );
		jqOpacityIcon
			.removeClass( "fa-moon-o fa-lightbulb-o" )
			.addClass( op < .5 ? "fa-moon-o" : "fa-lightbulb-o" )
		;
		jqOpacitySliderParent.attr(
			"data-tooltip-content",
			"Brightness : " + Math.round( op * 100 ) + " %"
		);
		return that;
	},
	subtitlesToggle: function( b ) {
		that.subtitlesCue( b
			? api.subtitles.findCue()
			: null
		);
		jqSubtitlesBtn
			.removeClass( "enable disable" )
			.addClass( b ? "enable" : "disable" )
			.attr( "data-tooltip-content", b ? "Disable subtitles" : "Enable subtitles" )
		;
		return that;
	},
	subtitlesCue: function( cue ) {
		if ( cue !== currentCue ) {
			if ( currentCue = cue ) {
				jqSubtitlesCue.html( cue.text );
			} else {
				jqSubtitlesCue.empty();
			}
		}
		return that;
	}
};

playerUI
	.pause()
	.currentTime( 0 )
	.duration( 0 )
	.subtitlesToggle( false )
	.volume( api.video.volume() )
	.opacity( api.video.opacity() )
	.exitFullscreen()
;

})();
