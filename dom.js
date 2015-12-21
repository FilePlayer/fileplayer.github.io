(function() {

window.dom = {
	jqWindow: $( window ),
	jqDoc: $( document ),
	jqBody: $( document.body ),

	// Player
	jqPlayer: $( "#player" ),
	jqPlayerCtrl: $( "#ctrl" ),
		// Video
		jqPlayerVideo: $( "#player video.main" ),
		jqPlayerFullscreenBtn: $( "#ctrl .btn.fullscreen" ),
		// Texts on screen
		jqPlayerTitle: $( "#titleFile" ),
		jqPlayerShortcutDesc: $( "#shortcutDesc" ),
		jqPlayerCue: $( "#cues > *" ),
		// Subtitles
		jqPlayerSubtitlesIcon: $( "#ctrl .subtitles .fa" ),
		jqPlayerSubtitlesToggle: $( "#ctrl .menu.subtitles .slidebutton" ),
		jqPlayerSubtitlesCheckbox: $( "#ctrl .menu.subtitles input" ),
		jqPlayerSubtitlesList: $( "#ctrl .menu.subtitles ul" ),
		// Play/pause/stop/prev/next
		jqPlayerPlayBtn: $( "#ctrl .play" ),
		jqPlayerStopBtn: $( "#ctrl .stop" ),
		jqPlayerPrevBtn: $( "#ctrl .prev" ),
		jqPlayerNextBtn: $( "#ctrl .next" ),
		// Volume
		jqPlayerVolumeIcon: $( "#ctrl .volume .fa" ),
		jqPlayerVolumeSlider: $( "#ctrl .volume .cuteslider" ),
		// Opacity
		jqPlayerOpacityIcon: $( "#ctrl .opacity .fa" ),
		jqPlayerOpacitySlider: $( "#ctrl .opacity .cuteslider" ),
		// CurrentTime
		jqPlayerSliderCurrentTime: $( "#ctrl .cuteslider.position" ),
			// Thumbnail
			jqPlayerThumbnail: $( "#player .thumbnail" ),
			jqPlayerThumbnailVideo: $( "#player .thumbnail video" ),
			jqPlayerThumbnailCanvas: $( "#player .thumbnail canvas" ),
			// Texts
			jqPlayerTimeText: $( "#player .txt.position" ),
			jqPlayerTimeCurrent: $( "#player .position .current" ),
			jqPlayerTimeRemaining: $( "#player .position .remaining" ),
			jqPlayerTimeDuration: $( "#player .position .duration" ),

	// Playlist
	jqPlaylist: $( "#playlist" ),
		// Toggle button
		jqPlaylistToggleBtn: $( "#ctrl .btn.playlist" ),
		// Left border to extend the playlist
		jqPlaylistExtendWidth: $( "#playlist .extendWidth" ),
		// List of playlist's items
		jqPlaylistContent: $( "#playlist .content" )
};

// Make sure all the selections above works.
for ( var key in window.dom ) {
	if ( window.dom[ key ].length === 0 ) {
		console.error( "dom." + key + " is empty." );
	}
}

})();
