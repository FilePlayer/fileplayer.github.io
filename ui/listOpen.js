"use strict";

ui.listIsOpen = false;

ui.listOpenToggle = function( b ) {
	if ( typeof b !== "boolean" ) {
		b = !ui.listIsOpen;
	}

	ui.listIsOpen = b;
	dom.fileplayer.toggleClass( "list-open", b );
	if ( b ) {
		ui.showCtrl();
		// Update the Width of the Filename *after* the playlist is open.
		setTimeout( ui.updimFilename, 250 );
	} else {
		ui.hideCtrl().updimFilename();
		dom.playlistInputURL.blur();
	}
	dom.ctrlPlaylistBtn[ 0 ].dataset.tooltipContent = b ? "Hide playlist" : "Show playlist";
	Cookies.set( "playlistshow", b, { expires: 365 } );
	return ui;
};
