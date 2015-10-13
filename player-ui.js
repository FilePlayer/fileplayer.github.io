(function() {

var
	that,

	// Buttons: play/pause.
	jqPlayBtn = $( ".play", dom.jqPlayerCtrl ),

	// Buttons, slider: volume.
	jqVolumeBtn = $( ".btn.volume", dom.jqPlayerCtrl ),
	jqVolumeIcon = $( ".fa", jqVolumeBtn ),
	jqVolumeSlider = $( ".cuteSlider", jqVolumeBtn ),
	jqVolumeSliderParent = jqVolumeSlider.parent(),

	// Texts, slider: position/duration.
	jqTimeTxt = $( ".txt.position", dom.jqPlayerCtrl )
	jqTimeTxtCurrent = $( ".current", jqTimeTxt ),
	jqTimeTxtRemaining = $( ".remaining", jqTimeTxt ),
	jqTimeTxtDuration = $( ".duration", jqTimeTxt ),
	jqTimeSlider = $( ".cuteSlider.position", dom.jqPlayerCtrl ),
	jqTimeSliderParent = jqTimeSlider.parent(),

	jqBtnFScr = $( ".btn.fullscreen", dom.jqPlayerCtrl )
;

function volStr( vol ) {
	return "Volume : " + Math.round( vol * 100 ) + " %";
}

window.playerUI = that = {
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
		api.subtitles.update();
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
	}
};

playerUI
	.pause()
	.currentTime( 0 )
	.duration( 0 )
	.volume( api.video.volume() )
	.exitFullscreen()
;

})();
