"use strict";

(function() {

// Cookies:
var
	cookies = Cookies.get(),
	vol = cookies.volume,
	opacity = cookies.brightness,
	plMode = cookies.playlistmode,
	plShow = cookies.playlistshow === "true",
	plWidth = cookies.playlistwidth || 350
;
if ( vol === undefined ) {
	vol = 1;
}
if ( opacity === undefined ) {
	opacity = 1;
} else if ( opacity === "0" ) {
	opacity = 0.2;
}
if ( plMode !== "loopAll" ) {
	plMode = true;
}

// Initialisation:
playerUI.textsShowing = false;

api.video
	.resizeUpdate()
	.opacity( opacity )
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
	.showToggle( plShow )
	.width( plWidth )
	.shuffle( false )
	.updateList()
	.updateIndex()
	.updateTotal()
;

api.visualisations.select( "Oscilloscope" );

playerUI.textsShowing = true;

})();
