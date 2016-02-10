"use strict";

(function() {

var
	jqURL = dom.playlistInputURL
;

// When we press Enter in the input.
dom.playlistForm.submit( function() {
	var url = jqURL.val();

	jqURL.val( "" ).blur();
	api.request.checkCORS( url, function( okCORS ) {
		if ( okCORS ) {
			playlistUI.dragover( dom.screen );
			api.playlist.addFiles( [ url ], true );
		} else {
			lg( "URL not supported (probably a CORS issue)." );
		}
	});
	return false;
});

// Don't interfere with all the keyboard's shorcuts.
jqURL.keydown( function( e ) {
	e.stopPropagation();
});

})();
