"use strict";

(function() {

var width;

$.extend( ui, {
	listWidth: function( w ) {
		if ( arguments.length === 0 ) {
			return width;
		}
		width = w;
		dom.playlist.css( "width", w + "%" );
		ui.listResize();
		if ( ui.listIsOpen() ) {
			api.screen.resizeFilename();
		}
		Cookies.set( "playlistwidth", w, { expires: 365 } );
		return ui;
	},
	listResize: function() {
		width = dom.playlist.width() / api.screen.width * 100;
		return ui;
	}
});

})();
