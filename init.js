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
	listWidth = cookies.playlistwidth || ( dom.playlist.width() / ui.pxScreenWidth * 100 )
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

api.screen.brightness( brightness );
api.audio.volume( vol );
api.playlist.repeat( plMode );

ui
	.video360Toggle( false )
	.visualizerSelect( "Oscilloscope" )
	.visualizerToggle( !!window.AudioContext )
	.pause()
	.listUpdate()
	.indexFile()
	.totalFiles()
	.currentTime( 0 )
	.duration( 0 )
	.speed( 1 )
	.listWidth( listWidth )
	.listOpenToggle( listOpen )
	.shuffle( false )
	.fullscreenToggle( false )
	.subtitlesToggle( false )
;

// The onratechange event is fired after this line.
setTimeout( function() {
	ui.actionDescEnable = true;
}, 500 );

})();
