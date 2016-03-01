"use strict";

// When we press Enter in the input.
dom.playlistForm.submit( function() {
	var url = dom.playlistInputURL.val();

	dom.playlistInputURL.val( "" ).blur();
	api.request.checkCORS( url, function( okCORS ) {
		if ( okCORS ) {
			ui.listDragOver( dom.screen );
			api.playlist.addFiles( [ url ], true );
		} else {
			lg( "URL not supported (probably a CORS issue)." );
		}
	});
	return false;
});

// Don't interfere with all the keyboard's shorcuts.
dom.playlistInputURL.keydown( function( e ) {
	e.stopPropagation();
});
