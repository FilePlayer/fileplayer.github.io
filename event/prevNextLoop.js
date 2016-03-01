"use strict";

(function() {

var modes = [ false, true, "loopOne", "loopAll" ];

dom.playlistShuffleBtn.click( api.playlist.shuffle );

dom.playlistRepeatBtn.click( function() {
	api.playlist.repeat( modes[
		( 1 + $.inArray( api.playlist.repeat(), modes ) ) % modes.length
	]);
});

api.keyboard
	.shortcut( "p", api.playlist.prev )
	.shortcut( "n", api.playlist.next )
;

dom.ctrlPrevBtn.click( api.playlist.prev );
dom.ctrlNextBtn.click( api.playlist.next );

})();
