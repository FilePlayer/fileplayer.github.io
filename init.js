"use strict";

(function() {

playerUI.textsShowing = false;

api.video
	.resizeUpdate()
	.opacity( 1 )
;

api.audio
	.volume( 1 )
;

api.playlist
	.playingMode( true )
;

playerUI
	.pause()
	.currentTime( 0 )
	.duration( 0 )
	.subtitlesToggle( false )
	.visualisationsToggle( false )
	.exitFullscreen()
;

playlistUI
	.hide()
	.shuffle( false )
	.width( 350 )
	.updateList()
	.updateIndex()
	.updateTotal()
;

api.visualisations.select( "Oscilloscope" );

playerUI.textsShowing = true;

})();
