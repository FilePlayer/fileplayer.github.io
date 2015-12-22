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
	jqSubtitlesCueParent = dom.jqPlayerCue.parent(),
	jqSubtitlesCue = dom.jqPlayerCue,
	jqSubtitlesCheckbox = dom.jqPlayerSubtitlesCheckbox,
	jqSubtitlesToolip = dom.jqPlayerSubtitlesToggle.parent(),

	// Texts: texts on screen.
	textsShowing,
	jqScreenTexts = [
		dom.jqPlayerTitle,
		dom.jqPlayerShortcutDesc
	],
	screenTextsTimeoutIds = [],

	// Playlist
	playlistWasShow
;

function screenTexts( i, msg ) {
	if ( textsShowing ) {
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
		playlistWasShow = playlistUI.isShow();
		playlistUI.hide();
		jqBtnFScr
			.removeClass( "fa-expand" )
			.addClass( "fa-compress" )
			.attr( "data-tooltip-content", "Exit full screen" )
		;
		return that;
	},
	exitFullscreen: function() {
		if ( playlistWasShow ) {
			playlistUI.show();
		}
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
		return that.actionDesc( "Play" );
	},
	pause: function() {
		jqPlayBtn
			.removeClass( "fa-pause" )
			.addClass( "fa-play" )
			.attr( "data-tooltip-content", "Play" )
		;
		return that.actionDesc( "Pause" );
	},
	stop: function() {
		dom.jqPlayer.removeClass( "cinema" );
		api.thumbnail.canvas.drawFromImg();
		jqTimeSliderParent.attr( "data-tooltip-content", null );
		return that
			.pause()
			.currentTime( 0 )
			.duration( 0 )
			.actionDesc( "Stop" )
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
		var volStr = "Volume : " + Math.round( vol * 100 ) + " %";
		jqVolumeSliderParent.attr( "data-tooltip-content", volStr );
		return that.actionDesc( volStr );
	},
	speed: function( rate ) {
		return that.actionDesc( "Speed : " + rate.toFixed( 2 ) + "x" );
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
	subtitlesResizeUpdate: function() {
		var
			imgW = api.video.imageWidth,
			btm = ( api.video.elementHeight - api.video.imageHeight ) / 2
		;
		jqSubtitlesCueParent
			// 80: dom.jqPlayerCtrl.outerHeight()
			.toggleClass( "isUnderCtrl", btm < 80 )
			.css({
				bottom: btm,
				fontSize: Math.max( 10, imgW / 100 * 2.5 ) + "px"
			})
		;
		return that;
	},
	subtitlesToggle: function( b ) {
		that.subtitlesCue( b
			? api.subtitles.findCue()
			: null
		);
		jqSubtitlesCheckbox.attr( "checked", b ? "checked" : null );
		jqSubtitlesToolip.attr(
			"data-tooltip-content",
			b ? "Disable subtitles" : "Enable subtitles"
		);
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
	},
	subtitlesDelay: function( delay ) {
		return that
			.actionDesc( "Subtitles delay : " + delay.toFixed( 3 ) + " s" )
			.subtitlesCue( api.subtitles.findCue() );
		;
	}
};

textsShowing = false;

playerUI
	.pause()
	.currentTime( 0 )
	.duration( 0 )
	.subtitlesToggle( false )
	.volume( api.video.volume() )
	.opacity( api.video.opacity() )
	.exitFullscreen()
;

textsShowing = true;

})();
