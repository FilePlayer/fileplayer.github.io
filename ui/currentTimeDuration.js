"use strict";

$.extend( ui, {
	currentTime: function( sec ) {
		ui.subtitlesCue( api.subtitles.findCue() );
		dom.ctrlCutesliderPosition.element().val( sec );
		dom.ctrlTimeCurrent.text( utils.secondsToString( sec ) );
		dom.ctrlTimeRemaining.text( utils.secondsToString( api.video.duration() - sec ) );
		clearTimeout( ui.seekTimeout );
		if ( api.video.isPlaying ) {
			ui.seekTimeout = setTimeout( ui.seeking, 700 );
		}
		return ui;
	},
	duration: function( sec ) {
		dom.ctrlTimeDuration.text( utils.secondsToString( sec ) );
		return ui;
	}
});
