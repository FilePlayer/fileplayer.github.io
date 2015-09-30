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

function onPlay() {
	var isPlaying = playerAPI.play();
	jqBtnPlay
		.removeClass( "fa-play fa-pause" )
		.addClass( isPlaying ? "fa-pause" : "fa-play" )
		.attr( "data-tooltip-content", isPlaying ? "Pause" : "Play" )
	;
}

jqBtnPlay.click( playToggle );

playerAPI
	// Play/pause the file by pressing the space bar.
	.addKeys( " ", function() {
		playToggle();
		playerAPI.shortcutDesc( playerAPI.play() ? "Play" : "Pause" );
	})
	// Update the play/pause button via the standard play/pause events.
	.jqVideoElement.on( "play pause", onPlay )
;

// Continue the initialisation by simulate a `onplay` event.
onPlay();

})();
