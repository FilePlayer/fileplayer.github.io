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
		if ( !isStopped ) {
			isStopped = true;
			oldSource = this.getSource();
			elVideo.pause();
			onPlay();
			this
				.setSource( "" )
				.positionReset()
			;
		}
		return this;
	}
});

function onPlay() {
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
	.jqVideoElement.on( "play pause", onPlay )
;

// Continue the initialisation by simulate a `onplay` event.
onPlay();

})();
