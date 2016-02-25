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

// Force the window resize event to set the width of the window.
dom.doc.trigger( "resize" );

// Cookies:
var
	cookies = Cookies.get(),
	vol = cookies.volume,
	brightness = cookies.brightness,
	plMode = cookies.playlistmode,
	listOpen = cookies.playlistshow === "true",
	listWidth = cookies.playlistwidth || ( dom.playlist.width() / api.screen.width * 100 )
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
ui.actionDescEnable = false;

api.screen
	.brightness( brightness )
;

api.audio
	.volume( vol )
;

api.video
	// Force the change (data-binding).
	.playbackRate( .5 )
	.playbackRate( 1 )
;

api.playlist
	.repeat( plMode )
;

api.visualisations
	.select( "Oscilloscope" )
	.toggle( !!window.AudioContext )
;

ui
	.pause()
	.listUpdate()
	.indexFile()
	.totalFiles()
	.currentTime( 0 )
	.duration( 0 )
	.listWidth( listWidth )
	.listOpenToggle( listOpen )
	.shuffle( false )
	.fullscreenToggle( false )
	.subtitlesToggle( false )
;

// The onratechange event is fired after this line.
setTimeout( function() {
	ui.actionDescEnable = true;
}, 100 );

})();
