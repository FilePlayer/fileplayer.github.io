(function() {

var
	elVideo = playerAPI.videoElement,
	jqElement_cuteSlider = $( ".cuteSlider.position", playerAPI.jqControls ),
	jqCuteSliderContainer = jqElement_cuteSlider.parent(),
	jqTxtPosition = $( ".txt.position", playerAPI.jqControls ),
	jqCurrent = $( ".current", jqTxtPosition ),
	jqDuration = $( ".duration", jqTxtPosition ),
	jqRemaining = $( ".remaining", jqTxtPosition )
;

function timeUpdate() {
	var
		sec = elVideo.currentTime,
		dur = elVideo.duration
	;
	playerAPI.subtitlesUpdate();
	jqCurrent.text( utils.secondsToString( sec ) );
	jqRemaining.text( utils.secondsToString( dur - sec ) );
	jqElement_cuteSlider.element().val( sec / dur );
}

function durationUpdate() {
	jqDuration.text( utils.secondsToString( elVideo.duration ) );
}

$.extend( playerAPI, {
	positionReset: function() {
		durationUpdate();
		return this.position( 0 );
	},
	position: function( p ) {
		if ( !arguments.length ) {
			return elVideo.currentTime;
		}
		if ( elVideo.duration ) {
			elVideo.currentTime = utils.range( 0, p, elVideo.duration, elVideo.currentTime );
		}
		timeUpdate();
		return this;
	},
	duration: function() {
		return elVideo.duration || 0;
	}
});

jqElement_cuteSlider
	.on( "change", function() {
		if ( elVideo.duration ) {
			playerAPI.position( this.value * elVideo.duration );
		}
	})
;

// Switch between showing the duration or the remaining time.
jqTxtPosition.click( function() {
	jqTxtPosition.toggleClass( "remaining" );
});

function position( p ) {
	playerAPI
		.position( p )
		.shortcutDesc(
			utils.secondsToString( playerAPI.position() ) + " / " +
			utils.secondsToString( elVideo.duration )
		)
	;
}

playerAPI
	// Control the position with the keyboard.
	.addKeys( "shift+left",  position.bind( null,  "-=3" ) )
	.addKeys( "shift+right", position.bind( null,  "+=3" ) )
	.addKeys( "alt+left",    position.bind( null, "-=10" ) )
	.addKeys( "alt+right",   position.bind( null, "+=10" ) )
	.addKeys( "ctrl+left",   position.bind( null, "-=60" ) )
	.addKeys( "ctrl+right",  position.bind( null, "+=60" ) )
	// Sync the currentTime, remainingTime and the duration.
	.jqVideoElement
		.on( {
			durationchange: durationUpdate,
			timeupdate: timeUpdate
		})
;

// Write "00:00 / 00:00" by default.
playerAPI.positionReset();

})();
