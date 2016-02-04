"use strict";

(function() {

var
	timeoutId
;

dom.playlist
	.mouseenter( function() {
		dom.playlistList.stop();
		clearTimeout( timeoutId );
	})
	.mouseleave( function() {
		timeoutId = setTimeout( playlistUI.scrollToSelection, 1500 );
	})
;

})();
