(function() {

var
	elVideo = playerAPI.videoElement,
	jqElement_cuteSlider = $( ".cuteSlider.position", playerAPI.jqControls ),
	jqTxtPosition = $( ".txt.position", playerAPI.jqControls ),
	jqCurrent = $( ".current", jqTxtPosition ),
	jqDuration = $( ".duration", jqTxtPosition ),
	jqRemaining = $( ".remaining", jqTxtPosition )
;

function timeUpdate( sec ) {
	var dur = elVideo.duration;
	playerAPI.subtitlesUpdate( sec );
	jqCurrent.text( playerAPI.secondsToString( sec ) );
	jqRemaining.text( playerAPI.secondsToString( dur - sec ) );
	if ( dur ) {
		jqElement_cuteSlider.element().val( sec / dur );
	}
}

function durationUpdate() {
	jqDuration.text( playerAPI.secondsToString( elVideo.duration ) );
}

$.extend( playerAPI, {
	position: function( p ) {
		if ( !arguments.length ) {
			return elVideo.currentTime;
		}
		if ( elVideo.duration ) {
			timeUpdate(
				elVideo.currentTime =
					p < 0 ? 0 :
					p < elVideo.duration ? p : elVideo.duration
			);
		}
		return this;
	},
	positionRelative: function( p ) {
		return this.position( this.position() + p );
	},
	secondsToString: function( sec ) {
		var
			s = ~~( sec % 60 ),
			m = ~~( sec / 60 ) % 60,
			h = ~~( sec / 3600 )
		;
		if ( s < 10 ) { s = "0" + s; }
		if ( m < 10 ) { m = "0" + m; }

		// 3600 -> "1:00:00"
		//   60 ->   "01:00"
		return (
			( h ? h + ":" : "" ) +
			m + ":" + s
		);
	}
});

jqElement_cuteSlider.on( "change", function() {
	playerAPI.position( this.value * elVideo.duration );
});

// Switch between showing the duration or the remaining time.
jqTxtPosition.click( function() {
	jqTxtPosition.toggleClass( "remaining" );
});

function posRel( p ) {
	playerAPI
		.positionRelative( p )
		.shortcutDesc(
			playerAPI.secondsToString( playerAPI.position() ) + " / " +
			playerAPI.secondsToString( elVideo.duration )
		)
	;
}

playerAPI
	// Control the position with the keyboard.
	.addKeys( "shift+left",  posRel.bind( null,  -3 ) )
	.addKeys( "shift+right", posRel.bind( null,  +3 ) )
	.addKeys( "alt+left",    posRel.bind( null, -10 ) )
	.addKeys( "alt+right",   posRel.bind( null, +10 ) )
	.addKeys( "ctrl+left",   posRel.bind( null, -60 ) )
	.addKeys( "ctrl+right",  posRel.bind( null, +60 ) )
	// Sync the currentTime, remainingTime and the duration.
	.jqVideoElement
		.on( {
			durationchange: durationUpdate,
			timeupdate: function() {
				timeUpdate( elVideo.currentTime );
			}
		})
;

// Write 00:00:00 by default.
timeUpdate();
durationUpdate();

})();
