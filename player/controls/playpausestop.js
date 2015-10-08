(function() {

var
	oldSource,
	elVideo = playerAPI.videoElement,
	jqBtnPlay = $( ".play", playerAPI.jqControls ),
	jqBtnStop = $( ".stop", playerAPI.jqControls ),
	isStopped = true
;

$.extend( playerAPI, {
	play: function( b ) {
		if ( !arguments.length ) {
			return !elVideo.paused;
		}
		if ( b ) {
			if ( isStopped && oldSource ) {
				this.setSource( oldSource );
			}
			if ( this.getSource() ) {
				isStopped = false;
				this.jqPlayer.addClass( "cinema" );
				elVideo.play();
			}
		} else {
			elVideo.pause();
		}
		return this;
	},
	playToggle: function() {
		return this.play( elVideo.paused );
	},
	stop: function() {
		isStopped = true;
		elVideo.pause();
		playpause();
		oldSource = this.getSource();
		this
			.setSource( "" )
			.positionReset()
			.jqPlayer
				.removeClass( "cinema" )
		;
		return this;
	}
});

function playpause() {
	var isPlaying = playerAPI.play();
	jqBtnPlay
		.removeClass( "fa-play fa-pause" )
		.addClass( isPlaying ? "fa-pause" : "fa-play" )
		.attr( "data-tooltip-content", isPlaying ? "Pause" : "Play" )
	;
}

jqBtnPlay.click( function() {
	playerAPI.playToggle();
});

jqBtnStop.click( function() {
	playerAPI.stop();
});

playerAPI
	// Keyboard shortcup to: stop, play/pause.
	.addKeys( "s", function() {
		playerAPI
			.stop()
			.shortcutDesc( "Stop" )
		;
	})
	.addKeys( " ", function() {
		playerAPI
			.playToggle()
			.shortcutDesc( playerAPI.play() ? "Play" : "Pause" )
		;
	})
	// Update the play/pause button via the standard play/pause events.
	.jqVideoElement.on( {
		"play pause": playpause,
		"ended" : playerAPI.stop.bind( playerAPI )
	})
;

// Continue the initialisation by simulate a `onplay` and `ended` event.
playpause();
playerAPI.stop();

})();
