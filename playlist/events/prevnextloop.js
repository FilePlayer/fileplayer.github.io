"use strict";

(function() {

var
	playModes = [ false, true, "loopOne", "loopAll" ]
;

dom.playlistShuffleBtn.click( api.playlist.shuffle );

dom.playlistRepeatBtn.click( function() {
	api.playlist.playingMode( playModes[
		( 1 + $.inArray( api.playlist.playingMode(), playModes ) ) % playModes.length
	]);
});

api.keyboard
	.shortcut( "p", api.playlist.prev )
	.shortcut( "n", api.playlist.next )
;

dom.ctrlPrevBtn.click( api.playlist.prev );
dom.ctrlNextBtn.click( api.playlist.next );

})();
