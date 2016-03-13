"use strict";

ui.fullscreenToggle = function( b ) {
	if ( typeof b !== "boolean" ) {
		b = !document.isFullscreen();
	}
	if ( b ) {
		ui.listWasOpen = ui.listIsOpen;
		ui.listOpenToggle( false );
	} else if ( ui.listWasOpen ) {
		ui.listOpenToggle( true );
	}
	dom.ctrlFullscreenBtn
		.removeClass( "fa-compress fa-expand" )
		.addClass( b ? "fa-compress" : "fa-expand" )
		.attr( "data-tooltip-content", b ? "Exit full screen" : "Full screen" )
	;
	return ui;
};
