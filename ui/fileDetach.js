"use strict";

ui.fileDetach = function( jqFile ) {
	if ( jqFile ) {
		jqFile.addClass( "dragging" );
		// callback to the end of the CSS's animation.
		ui.fileDetachTimeoutId = setTimeout( function() {
			jqFile.detach();
			ui.listUpdate();
		}, 200 );
	}
	return ui;
};

ui.fileReattach = function( jqFile ) {
	clearTimeout( ui.fileDetachTimeoutId );
	ui.listAdd( jqFile );
	setTimeout( function() {
		jqFile.removeClass( "dragging" );
	}, 1 );
	return ui;
};
