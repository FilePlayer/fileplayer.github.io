"use strict";

$.extend( ui, {
	listWidth: function( w ) {
		dom.playlist.css( "width", w + "%" );

		// Recalcul of the `width` to prevent go less than the `min-width`.
		ui.percListWidth = dom.playlist.width() / ui.pxScreenWidth * 100;
		if ( ui.listIsOpen ) {
			ui.updimFilename();
		}
		Cookies.set( "playlistwidth", w, { expires: 365 } );
		return ui;
	}
});
