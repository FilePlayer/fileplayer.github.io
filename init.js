"use strict";

(function() {

// Remove all whitespace node:
function rmChild( el ) {
	var save, n = el.firstChild;
	while ( n !== null ) {
		rmChild( save = n );
		n = n.nextSibling;
		if ( save.nodeType !== 1 && /^\s*$/.test( save.textContent ) ) {
			el.removeChild( save );
		}
	}
}
rmChild( document.body );

// Cookies:
var
	cookies = Cookies.get(),
	vol = cookies.volume,
	brightness = cookies.brightness,
	plMode = cookies.playlistmode,
	plShow = cookies.playlistshow === "true",
	plWidth = cookies.playlistwidth || 25
;
if ( vol === undefined ) {
	vol = 1;
}
if ( brightness === undefined ) {
	brightness = 1;
} else if ( brightness === "0" ) {
	brightness = 0.2;
}
if ( plMode !== "loopAll" ) {
	plMode = true;
}

// Initialisation:
dom.doc.trigger( "resize" );

playerUI.textsShowing = false;

api.screen
	.brightness( brightness )
;

api.audio
	.volume( vol )
;

playerUI
	.pause()
	.currentTime( 0 )
	.duration( 0 )
	.subtitlesToggle( false )
	.visualisationsToggle( false )
	.exitFullscreen()
;

api.playlist
	.playingMode( plMode )
;

playlistUI
	.width( plWidth )
	.showToggle( plShow )
	.shuffle( false )
	.updateList()
	.updateIndex()
	.updateTotal()
;

api.visualisations.select( "Oscilloscope" );

playerUI.textsShowing = true;

})();
