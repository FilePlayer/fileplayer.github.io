(function() {

var
	elVideo = playerAPI.videoElement,
	jqBtnPlay = $( ".play", playerAPI.jqControls )
;

$.extend( playerAPI, {
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
	playerAPI.playToggle();
	return false;
});

// Update the UI/controls in live
playerAPI.jqVideoElement
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
