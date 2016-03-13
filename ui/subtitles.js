"use strict";

(function() {

var currentCue;

ui.subtitlesToggle = function( b ) {
	ui.subtitlesCue( b
		? api.subtitles.findCue()
		: null
	);
	dom.ctrlSubtitlesBtn.toggleClass( "disable", !b );
	dom.ctrlSubtitlesCheckbox.attr( "checked", b ? "checked" : null );
	return ui;
};

ui.subtitlesCue = function( cue ) {
	if ( cue !== currentCue ) {
		if ( currentCue = cue ) {
			dom.screenCue.html( cue.text );
		} else {
			dom.screenCue.empty();
		}
	}
	return ui;
};

ui.subtitlesDelay = function( delay ) {
	return ui
		.actionDesc( "Subtitles delay : " + delay.toFixed( 3 ) + " s" )
		.subtitlesCue( api.subtitles.findCue() );
	;
};

})();
