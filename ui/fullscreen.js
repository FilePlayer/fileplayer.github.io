"use strict";

(function() {

var listWasOpen;

$.extend( ui, {
	fullscreenToggle: function( b ) {
		if ( typeof b !== "boolean" ) {
			b = !document.isFullscreen();
		}
		if ( b ) {
			listWasOpen = ui.listIsOpen;
			ui.listClose();
		} else if ( listWasOpen ) {
			ui.listOpen();
		}
		dom.ctrlFullscreenBtn
			.removeClass( "fa-compress fa-expand" )
			.addClass( b ? "fa-compress" : "fa-expand" )
			.attr( "data-tooltip-content", b ? "Exit full screen" : "Full screen" )
		;
		return ui;
	}
});

})();
