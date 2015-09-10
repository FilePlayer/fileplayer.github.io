(function() {

var
	jqVideo = $( "video" ),
	jqSliderPosition = $( "#ctrl .slider.position" ),
	jqTxtPosition = $( "#ctrl .text.position" ),
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

function timeUpdate() {
	var
		cur = elVideo.currentTime,
		dur = elVideo.duration
	;
	jqCurrent.text( convertSecondes( cur ) );
	jqRemaining.text( convertSecondes( dur - cur ) );
	if ( dur && !sliderClicked ) {
		jqSliderPosition.val( cur / dur );
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
		elVideo.currentTime = p;
		return this;
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

// Update the currentTime, remainingTime and the duration.
jqVideo
	.on( "timeupdate", timeUpdate )
	.on( "durationchange", durationUpdate )
;

// Write 00:00:00 by default.
timeUpdate();
durationUpdate();

})();
