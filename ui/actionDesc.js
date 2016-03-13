"use strict";

ui.actionDescEnable = true;

ui.actionDesc = function( msg ) {
	if ( ui.actionDescEnable ) {
		clearTimeout( ui.actionDescTimeoutId );
		dom.screenShortcutText
			.text( msg )
			.removeClass( "hidden" )
		;
		// Start to fadeout the element after 2s.
		ui.actionDescTimeoutId = setTimeout( function() {
			dom.screenShortcutText.addClass( "hidden" );
		}, 2000 );
	}
	return ui;
};
