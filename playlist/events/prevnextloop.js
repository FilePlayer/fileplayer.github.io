(function() {

api.keyboard
	.shortcut( "p", api.playlist.prev )
	.shortcut( "n", api.playlist.next )
;

dom.jqPlayerPrevBtn.click( api.playlist.prev );
dom.jqPlayerNextBtn.click( api.playlist.next );

})();
