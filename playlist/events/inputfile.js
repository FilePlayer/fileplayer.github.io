"use strict";

(function() {

dom.jqPlaylistInputFile.change( function() {
	api.playlist.addFiles( this.files );
});

dom.jqPlayerOpenBtn.click( api.playlist.dialogueFiles );

// This shortcut doesn't work on Firefox (security purpose).
api.keyboard.shortcut( "ctrl+o", api.playlist.dialogueFiles );

dom.jqBody.on({
	drop: function( e ) {
		var data = e.originalEvent.dataTransfer;
		if ( data ) {
			// Chrome :
			if ( data.items ) {
				api.playlist.extractAddFiles( data.items );
			// Everyone else :
			} else if ( data.files ) {
				api.playlist.addFiles( data.files );
			}
		}
		return false;
	},

	// Prevent the browser to load the file directly in the tab.
	// e.preventDefault in the "drop" event is not enough.
	dragover: false
});

})();
