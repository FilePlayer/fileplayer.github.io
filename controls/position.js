(function() {

var
	elVideo = playerAPI.videoElement,
	jqSliderPosition = $( ".slider.position", playerAPI.jqControls ),
	jqTxtPosition = $( ".text.position", playerAPI.jqControls ),
	jqCurrent = $( ".current", jqTxtPosition ),
	jqDuration = $( ".duration", jqTxtPosition ),
	jqRemaining = $( ".remaining", jqTxtPosition ),

	// This boolean prevent to not update automatically
	// the position's slider when the user click on it.
	sliderClicked = false
;

// convertSecondes( 4041 ) -> "01:07:21"
// ~~21.7 === 21
function convertSecondes( sec ) {
	var
		s = ~~( sec % 60 ),
		m = ~~( sec / 60 ) % 60,
		h = ~~( sec / 3600 )
	;
	if ( s < 10 ) { s = "0" + s; }
	if ( m < 10 ) { m = "0" + m; }
	if ( h < 10 ) { h = "0" + h; }
	return h + ":" + m + ":" + s;
}

function timeUpdate( sec ) {
	var dur = elVideo.duration;
	playerAPI.subtitlesUpdate( sec );
	jqCurrent.text( convertSecondes( sec ) );
	jqRemaining.text( convertSecondes( dur - sec ) );
	if ( dur && !sliderClicked ) {
		jqSliderPosition.val( sec / dur );
	}
}

function durationUpdate() {
	jqDuration.text( convertSecondes( elVideo.duration ) );
}

$.extend( playerAPI, {
	position: function( p ) {
		if ( !arguments.length ) {
			return elVideo.currentTime;
		}
		if ( p < 0 ) {
			p = 0;
		} else if ( p > elVideo.duration ) {
			p = elVideo.duration;
		}
		timeUpdate( p );
		elVideo.currentTime = p;
		return this;
	},
	positionRelative: function( p ) {
		return this.position( this.position() + p );
	}
});

jqSliderPosition
	.mousedown( function() {
		sliderClicked = true;
	})
	.mouseup( function() {
		sliderClicked = false;
	})
	.on( "input", function() {
		playerAPI.position( this.value * elVideo.duration );
	})
;

// Switch between showing the duration or the remaining time.
jqTxtPosition.click( function() {
	jqTxtPosition.toggleClass( "remaining" );
});

playerAPI
	// Control the position with the keyboard.
	.addKeys( "shift+left",  function() { playerAPI.positionRelative(  -3 ); })
	.addKeys( "shift+right", function() { playerAPI.positionRelative(  +3 ); })
	.addKeys( "alt+left",    function() { playerAPI.positionRelative( -10 ); return false; })
	.addKeys( "alt+right",   function() { playerAPI.positionRelative( +10 ); return false; })
	.addKeys( "ctrl+left",   function() { playerAPI.positionRelative( -60 ); })
	.addKeys( "ctrl+right",  function() { playerAPI.positionRelative( +60 ); })
	// Update the currentTime, remainingTime and the duration.
	.jqVideoElement
		.on( "timeupdate", function() {
			timeUpdate( elVideo.currentTime );
		})
		.on( "durationchange", durationUpdate )
;

// Write 00:00:00 by default.
timeUpdate();
durationUpdate();

})();
