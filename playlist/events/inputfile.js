"use strict";

(function() {

dom.jqPlaylistInputFile.change( function() {
	api.files.add( this.files );
});

dom.jqPlayerOpenBtn.click( api.playlist.dialogueFiles );

// This shortcut doesn't work on Firefox (security purpose).
api.keyboard.shortcut( "ctrl+o", api.playlist.dialogueFiles );

})();
