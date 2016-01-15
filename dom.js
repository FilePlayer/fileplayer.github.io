"use strict";

(function() {

window.dom = {
	jqWindow: $( window ),
	jqDoc: $( document ),
	jqBody: $( document.body ),
	jqTitle: $( "title" ),

	// Player
	jqPlayer: $( "#player" ),
	jqPlayerCtrl: $( "#ctrl" ),
		// Screen
		jqPlayerScreen: $( "#screen" ),
		jqPlayerVideo: $( "#screen video" ),
		jqPlayerCanvas: $( "#screen canvas" ),
		jqPlayerFullscreenBtn: $( "#ctrl .btn.fullscreen" ),
		// File's title
		jqPlayerTitle: $( "#title" ),
		jqPlayerTitleName: $( "#title span" ),
		// Texts on screen
		jqPlayerShortcutDesc: $( "#shortcutDesc" ),
		jqPlayerCue: $( "#cues > *" ),
		// Subtitles
		jqPlayerSubtitlesBtn: $( "#ctrl .btn.subtitles" ),
		jqPlayerSubtitlesIcon: $( "#ctrl .subtitles .fa" ),
		jqPlayerSubtitlesToggle: $( "#ctrl .subtitles .slidebutton" ),
		jqPlayerSubtitlesCheckbox: $( "#ctrl .subtitles input" ),
		jqPlayerSubtitlesList: $( "#ctrl .subtitles ul" ),
		// Play/pause/stop/prev/next
		jqPlayerOpenBtn: $( "#ctrl .open" ),
		jqPlayerPlayBtn: $( "#ctrl .play" ),
		jqPlayerStopBtn: $( "#ctrl .stop" ),
		jqPlayerPrevBtn: $( "#ctrl .prev" ),
		jqPlayerNextBtn: $( "#ctrl .next" ),
		// Volume
		jqPlayerVolumeIcon: $( "#ctrl .volume .fa" ),
		jqPlayerVolumeSlider: $( "#ctrl .volume .cuteslider" ),
		// Visualisations
		jqPlayerVisuBtn: $( "#ctrl .btn.visu" ),
		jqPlayerVisuIcon: $( "#ctrl .visu .fa" ),
		jqPlayerVisuToggle: $( "#ctrl .visu .slidebutton" ),
		jqPlayerVisuCheckbox: $( "#ctrl .visu input" ),
		jqPlayerVisuList: $( "#ctrl .visu ul" ),
		// Opacity
		jqPlayerOpacityIcon: $( "#ctrl .opacity > .fa" ),
		jqPlayerOpacitySlider: $( "#ctrl .opacity .cuteslider" ),
		jqPlayerOpacityValue: $( "#ctrl .opacity .val" ),
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
		jqPlaylistInputFile: $( "#playlist input[type='file']" ),
		// Nav
		jqPlaylistNav: $( "#playlist nav" ),
			jqPlaylistNavIndex: $( "#playlist nav .current" ),
			jqPlaylistNavTotal: $( "#playlist nav .total" ),
			jqPlaylistShuffle: $( "#playlist nav .shuffle" ),
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
