(function() {

playerUI.textsShowing = false;

api.video
	.resizeUpdate()
	.opacity( 1 )
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
	.exitFullscreen()
;

playlistUI
	.hide()
	.width( 350 )
	.currentIndex( 0 )
	.totalFiles( 0 )
;

api.audio.selectVisu( "Oscilloscope" );

playerUI.textsShowing = true;

})();
