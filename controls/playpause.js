(function() {

var
	controls = window.player.controls,
	jqVideo = $( elVideo ),
	jqBtnPlay = $( "#ctrl .play" )
;

$.extend( controls, {
	play: function( b ) {
		if ( !arguments.length ) {
			return !elVideo.paused;
		}
		if ( b ) {
			elVideo.play();
		} else {
			elVideo.pause();
		}
		return this;
	},
	playToggle: function() {
		return this.play( elVideo.paused );
	}
});

jqBtnPlay.click( function() {
	controls.playToggle();
	return false;
});

// Update the UI/controls in live
jqVideo
	.on( "play pause", function() {
		jqBtnPlay
			.removeClass( "fa-play fa-pause" )
			.addClass(
				elVideo.paused
					? "fa-play"
					: "fa-pause"
			)
		;
	})
;

})();
