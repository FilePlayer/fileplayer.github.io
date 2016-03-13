"use strict";

ui.seekTimeout = null;
ui.isSeeking = false;

ui.seeking = function() {
	if ( !ui.isSeeking ) {
		ui.isSeeking = true;
		dom.fileplayer.addClass( "seeking" );
	}
	return ui;
};

ui.seeked = function() {
	clearTimeout( ui.seekTimeout );
	if ( ui.isSeeking ) {
		ui.isSeeking = false;
		dom.fileplayer.removeClass( "seeking" );
	}
	return ui;
};
