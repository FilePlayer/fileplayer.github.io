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

function playToggle() {
	playerAPI.playToggle();
	return false;
}

jqBtnPlay.click( playToggle );

playerAPI
	// Play/pause the file by pressing the space bar.
	.addKeys( " ", playToggle )
	// Update the play/pause button via the standard play/pause events.
	.jqVideoElement
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
