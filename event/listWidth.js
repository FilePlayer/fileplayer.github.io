"use strict";

(function() {

var
	mousedown = false,
	jqExtend = dom.playlistExtendWidth
;

api.keyboard.shortcut( "ctrl+l", ui.listOpenToggle );

dom.ctrlPlaylistBtn.click( ui.listOpenToggle );
dom.playlistCloseBtn.click( ui.listOpenToggle.bind( ui, false ) );

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
			ui.listWidth(
				100 - e.originalEvent.pageX / ui.pxScreenWidth * 100
			);
		}
	})
;

})();
