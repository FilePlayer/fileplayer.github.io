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
		// File's title
		jqPlayerTitle: $( "#title" ),
		jqPlayerTitleName: $( "#title span" ),
		// Texts on screen
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
		// Playlist toggle button
		jqPlaylistToggleBtn: $( "#ctrl .btn.playlist" ),

	// Playlist
	jqPlaylist: $( "#playlist" ),
		jqPlaylistExtendWidth: $( "#playlist .extendWidth" ),
		jqPlaylistContent: $( "#playlist .content" ),
		jqPlaylistList: $( "#playlist .list" ),
		// Nav
		jqPlaylistNav: $( "#playlist nav" ),
			jqPlaylistNavIndex: $( "#playlist nav .current" ),
			jqPlaylistNavTotal: $( "#playlist nav .total" ),
			jqPlaylistRepeat: $( "#playlist nav .repeat" ),
			jqPlaylistClose: $( "#playlist nav .close" )
};

// Make sure all the selections above works.
for ( var key in window.dom ) {
	if ( window.dom[ key ].length === 0 ) {
		console.error( "dom." + key + " is empty." );
	}
}

// This can be considered like NULL for jQuery.
// Useful for api.playlist.
dom.jqEmpty = $();

})();
