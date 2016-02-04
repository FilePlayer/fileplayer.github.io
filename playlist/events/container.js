"use strict";

(function() {

var
	mousedown = false,
	jqExtend = dom.playlistExtendWidth
;

api.keyboard.shortcut( "ctrl+l", playlistUI.showToggle );

dom.ctrlPlaylistBtn.click( playlistUI.showToggle );
dom.playlistCloseBtn.click( playlistUI.hide );

jqExtend
	.mousedown( function() {
		mousedown = true;
		dom.body.addClass( "ew-resize no-select" );
		jqExtend.addClass( "hover" );
	})
;

dom.doc
	.mouseup( function() {
		mousedown = false;
		dom.body.removeClass( "ew-resize no-select" );
		jqExtend.removeClass( "hover" );
	})
	.mousemove( function( e ) {
		if ( mousedown ) {
			playlistUI.width(
				dom.doc.width() -
				e.originalEvent.pageX
			);
		}
	})
;

})();
