"use strict";

(function() {

var
	that,
	isSeeking = false,
	seekTimeout,

	// Button: play/pause.
	jqPlayBtn = dom.ctrlPlayBtn,

	// Button, slider: volume.
	jqVolumeIcon = dom.ctrlVolumeIcon,
	jqVolumeSlider = dom.ctrlVolumeSlider,

	// Texts, slider: position/duration.
	jqTimeTxtCurrent = dom.ctrlTimeCurrent,
	jqTimeTxtRemaining = dom.ctrlTimeRemaining,
	jqTimeTxtDuration = dom.ctrlTimeDuration,
	jqTimeSlider = dom.ctrlCutesliderPosition,
	jqTimeSliderParent = jqTimeSlider.parent(),

	// Button: fullscreen.
	jqBtnFScr = dom.ctrlFullscreenBtn,

	// Subtitles.
	currentCue,
	jqSubtitlesCueParent = dom.screenCue.parent(),
	jqSubtitlesCue = dom.screenCue,

	// Texts: texts on screen.
	screenTextTimeoutId,

	// Playlist
	playlistWasShow
;

window.playerUI = that = {
	textsShowing: true,
	actionDesc: function( msg ) {
		if ( that.textsShowing ) {
			clearTimeout( screenTextTimeoutId );
			dom.screenShortcutText
				.text( msg )
				.removeClass( "hidden" )
			;
			// Start to fadeout the element after 2s.
			screenTextTimeoutId = setTimeout( function() {
				dom.screenShortcutText.addClass( "hidden" );
			}, 2000 );
		}
		return that;
	},
	loading: function() {
		var file = api.playlist.selectedFile();
		dom.fileplayer
			.removeClass( "audio video" )
			.addClass( "playing " + file.mediaType )
		;
		dom.screenFilenameText
			.add( dom.title )
				.text( file.name )
		;
		jqTimeSlider.element().val( 0 );
		jqTimeSliderParent.attr( "data-tooltip-content", null );
		api.thumbnail.canvas.drawFromImg();
		return that;
	},
	loaded: function() {
		var dur = api.video.duration();
		dom.ctrlInputRangePosition.attr( "max", dur );
		api.thumbnail.cache.init( Math.ceil( dur ) );
		return that;
	},
	seeking: function() {
		if ( !isSeeking ) {
			isSeeking = true;
			dom.fileplayer.addClass( "seeking" );
		}
		return that;
	},
	seeked: function() {
		clearTimeout( seekTimeout );
		if ( isSeeking ) {
			isSeeking = false;
			dom.fileplayer.removeClass( "seeking" );
		}
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
		jqPlayBtn
			.removeClass( "fa-play" )
			.addClass( "fa-pause" )
		;
		return that.actionDesc( "Play" );
	},
	pause: function() {
		jqPlayBtn
			.removeClass( "fa-pause" )
			.addClass( "fa-play" )
		;
		return that.actionDesc( "Pause" );
	},
	stop: function() {
		dom.fileplayer.removeClass( "playing audio video" );
		dom.screenFilenameText.empty();
		dom.title.text( "FilePlayer" );
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
		that.subtitlesCue( api.subtitles.findCue() );
		jqTimeSlider.element().val( sec );
		jqTimeTxtCurrent.text( utils.secondsToString( sec ) );
		jqTimeTxtRemaining.text( utils.secondsToString( api.video.duration() - sec ) );
		clearTimeout( seekTimeout );
		if ( api.video.isPlaying() ) {
			seekTimeout = setTimeout( playerUI.seeking, 700 );
		}
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
		return that.actionDesc( "Volume : " + utils.fPercent( vol ) );
	},
	speed: function( rate ) {
		var val = rate.toFixed( 2 ) + "x";
		dom.ctrlSpeedSlider.element().val( rate );
		dom.ctrlSpeedValue.text( val );
		return that.actionDesc( "Speed : " + val );
	},
	brightness: function( op ) {
		dom.screenBrightness.css( "opacity", op );
		dom.ctrlBrightnessSlider.element().val( op );
		dom.ctrlBrightnessIcon
			.removeClass( "fa-moon-o fa-lightbulb-o" )
			.addClass( op < .5 ? "fa-moon-o" : "fa-lightbulb-o" )
		;
		dom.ctrlBrightnessValue.text( utils.fPercent( op ) );
		return that;
	},
	subtitlesResizeUpdate: function() {
		var
			imgW = api.video.width,
			btm = ( api.screen.height - api.video.height ) / 2
		;
		jqSubtitlesCueParent
			.toggleClass( "isUnderCtrl", btm < 80 ) // 80: dom.ctrl.outerHeight()
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
		dom.ctrlSubtitlesBtn.toggleClass( "disable", !b );
		dom.ctrlSubtitlesCheckbox.attr( "checked", b ? "checked" : null );
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
	},
	visualisationsToggle: function( b ) {
		dom.ctrlVisualBtn.toggleClass( "disable", !b );
		dom.ctrlVisualCheckbox.attr( "checked", b ? "checked" : null );
		return that;
	}
};

})();
