"use strict";

(function() {

var open = false;

$.extend( ui, {
	listIsOpen: function() {
		return open;
	},
	listOpenToggle: function( b ) {
		if ( typeof b !== "boolean" ) {
			b = !open;
		}
		return b ? ui.listOpen() : ui.listClose();
	},
	listOpen: function() {
		open = true;
		dom.playlist.addClass( "show" );
		dom.ctrlPlaylistBtn[ 0 ].dataset.tooltipContent = "Hide playlist";
		api.screen.resizeFilename();
		Cookies.set( "playlistshow", open, { expires: 365 } );
		return ui;
	},
	listClose: function() {
		open = false;
		dom.playlist.removeClass( "show" );
		dom.playlistInputURL.blur();
		dom.ctrlPlaylistBtn[ 0 ].dataset.tooltipContent = "Show playlist";
		api.screen.resizeFilename();
		Cookies.set( "playlistshow", open, { expires: 365 } );
		return ui;
	}
});

})();
