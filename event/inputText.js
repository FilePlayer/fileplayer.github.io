"use strict";

// When we press Enter in the input.
dom.playlistForm.submit( function() {
	var url = dom.playlistInputURL.val();

	ui.seeking();
	dom.playlistInputURL.val( "" ).blur();
	api.request.checkCORS( url, function( okCORS ) {
		ui.listDragOver( dom.screen );
		api.playlist.addFiles( [ {
			url: url,
			cors: okCORS
		}], true );
	});
	return false;
});

// Don't interfere with all the keyboard's shorcuts.
dom.playlistInputURL.keydown( function( e ) {
	e.stopPropagation();
});
