"use strict";

(function() {

dom.jqPlaylistInputFile.change( function() {
	api.files.add( this.files );
});

function open() {
	dom.jqPlaylistInputFile.click();
}

dom.jqPlayerOpenBtn.click( open );

// This shortcut doesn't work on Firefox (security purpose).
api.keyboard.shortcut( "ctrl+o", open );

})();
