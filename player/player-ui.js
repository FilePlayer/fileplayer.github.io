"use strict";

(function() {

var
	that,

	// Button: play/pause.
	jqPlayBtn = dom.ctrlPlayBtn,

	// Button, slider: volume.
	jqVolumeIcon = dom.ctrlVolumeIcon,
	jqVolumeSlider = dom.ctrlVolumeSlider,
	jqVolumeSliderParent = jqVolumeSlider.parent(),

	// Texts, slider: position/duration.
	jqTimeTxtCurrent = dom.ctrlTimeCurrent,
	jqTimeTxtRemaining = dom.ctrlTimeRemaining,
	jqTimeTxtDuration = dom.ctrlTimeDuration,
	jqTimeSlider = dom.ctrlSliderCurrentTime,
	jqTimeSliderParent = jqTimeSlider.parent(),

	// Button: fullscreen.
	jqBtnFScr = dom.ctrlFullscreenBtn,

	// Button, slider: brightness.
	jqBrightnessIcon = dom.ctrlBrightnessIcon,
	jqBrightnessSlider = dom.ctrlBrightnessSlider,

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
	loaded: function() {
		var file = api.playlist.selectedFile();
		dom.fileplayer
			.removeClass( "audio video" )
			.addClass( "playing " + file.mediaType )
		;
		dom.screenFilenameText
			.add( dom.title )
				.text( file.name )
		;
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
		jqVolumeSliderParent.attr(
			"data-tooltip-content",
			"Volume : " + utils.fPercent( vol )
		);
		return that;
	},
	speed: function( rate ) {
		var val = rate.toFixed( 2 ) + "x";
		dom.ctrlSpeedSlider.element().val( rate );
		dom.ctrlSpeedValue.text( val );
		return that.actionDesc( "Speed : " + val );
	},
	brightness: function( op ) {
		dom.screenImage.css( "opacity", op );
		jqBrightnessSlider.element().val( op );
		jqBrightnessIcon
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
