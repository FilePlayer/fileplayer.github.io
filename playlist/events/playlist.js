(function() {

var
	mousedown = false,
	jqExtend = dom.jqPlaylistExtendWidth,
	playModes = [ false, true, "loopOne", "loopAll" ]
;

api.keyboard.shortcut( "ctrl+l", playlistUI.showToggle );

dom.jqPlaylistToggleBtn.click( playlistUI.showToggle );
dom.jqPlaylistClose.click( playlistUI.hide );

dom.jqPlaylistRepeat.click( function() {
	api.playlist.playingMode( playModes[
		( 1 + $.inArray( api.playlist.playingMode(), playModes ) ) % playModes.length
	]);
});
api.playlist.playingMode( true );

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
