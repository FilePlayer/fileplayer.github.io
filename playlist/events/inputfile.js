"use strict";

(function() {

function findNextSelected() {
	var el = api.playlist.selectedFile();
	playlistUI.elFileDragover = el && el.element.jqThis.next()[ 0 ];
}

dom.jqPlaylistInputFile.change( function() {
	findNextSelected();
	api.playlist.addFiles( this.files, true );
});

dom.jqPlayerOpenBtn.click( api.playlist.dialogueFiles );

// This shortcut doesn't work on Firefox (security purpose).
api.keyboard.shortcut( "ctrl+o", api.playlist.dialogueFiles );

function drop( e, autoplay ) {
	var data = e.originalEvent.dataTransfer;
	if ( data ) {
		// Chrome :
		if ( data.items ) {
			api.playlist.extractAddFiles( data.items, autoplay );
		// Everyone else :
		} else if ( data.files ) {
			api.playlist.addFiles( data.files, autoplay );
		}
	}
}

dom.jqPlaylist.on({
	dragover: function() {
		playlistUI.elFileDragover = null;
		return false;
	},
	drop: function( e ) {
		drop( e );
		return false;
	}
});

dom.jqBody.on({
	dragover: function() {
		findNextSelected();

		// Prevent the browser to load the file directly in the tab.
		// e.preventDefault in the "drop" event is not enough.
		return false;
	},
	drop: function( e ) {
		drop( e, true );
		return false;
	}
});

})();
