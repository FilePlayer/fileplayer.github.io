"use strict";

(function() {

function findNextSelected() {
	var el = api.playlist.selectedFile();
	playlistUI.dragover( el && el.element.jqThis.next()[ 0 ] );
}

// <input type="file" multiple/>
dom.jqPlaylistInputFile.change( function() {
	findNextSelected();
	api.playlist.addFiles( this.files, true );
});

dom.jqPlayerOpenBtn.click( api.playlist.dialogueFiles );

// This shortcut doesn't work on Firefox (security purpose).
api.keyboard.shortcut( "ctrl+o", api.playlist.dialogueFiles );

var
	dragX,
	dragY,
	dragOver,
	dragOverWindow
;

dom.jqBody.on({

	// When we are dragging over the player (not the playlist).
	dragover: function( e ) {
		var
			listY,
			x = e.pageX,
			y = e.pageY
		;

		if ( x !== dragX || y !== dragY ) {

			// Drag on the player.
			if ( !playlistUI.isShow() || x < dom.jqWindow.width() - playlistUI.width() ) {
				dragOver = "player";
				findNextSelected();

			// Drag on the playlist.
			} else {
				dragOver = "playlist";
				listY = dom.jqPlaylistList.position().top;
				if ( y >= listY ) {
					y = y - listY + dom.jqPlaylistList[ 0 ].scrollTop;
					playlistUI
						.updateList()
						.updateFileHeight()
						.dragover(
							playlistUI.jqFiles[ Math.round( y / playlistUI.fileHeight ) ] || null
						)
					;
				}
			}

			dragX = x;
			dragY = y;
		}

		// Prevent the browser to load the file directly in the tab.
		// e.preventDefault in the "drop" event is not enough.
		return false;
	},

	drop: function( e ) {
		var
			autoplay = dragOver === "player",
			data = e.originalEvent.dataTransfer
		;

		if ( data ) {
			// Chrome :
			if ( data.items ) {
				api.playlist.extractAddFiles( data.items, autoplay );
			// Everyone else :
			} else if ( data.files ) {
				api.playlist.addFiles( data.files, autoplay );
			}
		}
		return false;
	},

	// Fired at the end of an **intern** drag.
	dragend: function() {
		playlistUI.dragover( null );
		return false;
	},

	// Detect when the dragging file leave the window.
	// With a little hack to avoid the bubling of ondragleave...
	dragenter: function() {
		dragOverWindow = true;
	},
	dragleave: function() {
		if ( !dragOverWindow ) {
			playlistUI.dragover( null );
		}
		dragOverWindow = false;
	}
});

})();
