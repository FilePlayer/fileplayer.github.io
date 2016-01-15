"use strict";

(function() {

var
	timeoutId
;

dom.jqPlaylist
	.mouseenter( function() {
		dom.jqPlaylistList.stop();
		clearTimeout( timeoutId );
	})
	.mouseleave( function() {
		timeoutId = setTimeout( playlistUI.scrollToSelection, 1500 );
	})
;

})();
