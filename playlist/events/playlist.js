(function() {

var
	mousedown = false,
	jqExtend = dom.jqPlaylistExtendWidth
;

api.keyboard.shortcut( "ctrl+l", playlistUI.showToggle );

dom.jqPlaylistToggleBtn.click( playlistUI.showToggle );

jqExtend
	.mousedown( function() {
		mousedown = true;
		dom.jqBody.addClass( "ew-resize" );
		jqExtend.addClass( "hover" );
	})
;

dom.jqDoc
	.mouseup( function() {
		mousedown = false;
		dom.jqBody.removeClass( "ew-resize" );
		jqExtend.removeClass( "hover" );
	})
	.mousemove( function( e ) {
		if ( mousedown ) {
			playlistUI.width(
				dom.jqDoc.width() -
				e.originalEvent.pageX
			);
		}
	})
;

})();
