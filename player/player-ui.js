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
	screenTextTimeoutId,

	// Playlist
	playlistWasShow
;

window.playerUI = that = {
	textsShowing: true,
	actionDesc: function( msg ) {
		if ( that.textsShowing ) {
			clearTimeout( screenTextTimeoutId );
			dom.jqPlayerShortcutDesc
				.text( msg )
				.removeClass( "hidden" )
			;
			// Start to fadeout the element after 2s.
			screenTextTimeoutId = setTimeout( function() {
				dom.jqPlayerShortcutDesc.addClass( "hidden" );
			}, 2000 );
		}
		return that;
	},
	loaded: function() {
		var file = api.playlist.selectedFile();
		dom.jqPlayer
			.removeClass( "audio video" )
			.addClass( "playing " + file.type )
		;
		dom.jqPlayerTitleName.text( file.name );
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
		dom.jqPlayer.removeClass( "playing audio video" );
		dom.jqPlayerTitleName.empty();
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
			"Brightness : " + utils.fPercent( op )
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

})();
