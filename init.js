(function() {

playerUI.textsShowing = false;

api.video
	.resizeUpdate()
	.opacity( 1 )
	.rotation( 0 )
	// Force the volumechange event
	.volume( 0 )
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
	.currentIndex( 0 )
	.totalFiles( 0 )
;

api.audio.selectVisu( "Oscilloscope" );

playerUI.textsShowing = true;

})();
