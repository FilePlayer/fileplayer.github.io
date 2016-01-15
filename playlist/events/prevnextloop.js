"use strict";

(function() {

var
	playModes = [ false, true, "loopOne", "loopAll" ]
;

dom.jqPlaylistShuffle.click( api.playlist.shuffle );

dom.jqPlaylistRepeat.click( function() {
	api.playlist.playingMode( playModes[
		( 1 + $.inArray( api.playlist.playingMode(), playModes ) ) % playModes.length
	]);
});

api.keyboard
	.shortcut( "p", api.playlist.prev )
	.shortcut( "n", api.playlist.next )
;

dom.jqPlayerPrevBtn.click( api.playlist.prev );
dom.jqPlayerNextBtn.click( api.playlist.next );

})();
