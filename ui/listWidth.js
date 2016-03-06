"use strict";

$.extend( ui, {
	listWidth: function( w ) {
		ui.percListWidth = w;
		dom.playlist.css( "width", w + "%" );
		if ( ui.listIsOpen ) {
			ui.updimFilename();
		}
		Cookies.set( "playlistwidth", w, { expires: 365 } );
		return ui;
	}
});
