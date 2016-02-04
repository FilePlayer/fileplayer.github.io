"use strict";

(function() {

window.dom = {
	window: $( window ),
	doc: $( document ),
	body: $( document.body ),
	title: $( "title" ),

	// Main
	fileplayer: $( ".fileplayer" ),

	// Screen
	screen: $( ".screen" ),

		// Image
		screenImage: $( ".screen .image" ),
			screenVideo: $( ".screen video" ),
			screenCanvas: $( ".screen canvas" ),
		
		// Filename, subtitle's cues, shortcut description
		screenFilename: $( ".screen .filename" ),
		screenFilenameText: $( ".screen .filename span" ),
		screenShortcutText: $( ".screen .shortcutDesc" ),
		screenCue: $( ".screen .cues > *" ),

	// Playlist
	playlist: $( ".playlist" ),
		playlistExtendWidth: $( ".playlist .extendWidth" ),
		playlistContent: $( ".playlist .content" ),
		playlistList: $( ".playlist .list" ),
		playlistInputFile: $( ".playlist input[type='file']" ),

		// Nav
		playlistNav: $( ".playlist nav" ),
			playlistNavIndex: $( ".playlist nav .current" ),
			playlistNavTotal: $( ".playlist nav .total" ),
			playlistShuffleBtn: $( ".playlist nav .shuffle" ),
			playlistRepeatBtn: $( ".playlist nav .repeat" ),
			playlistCloseBtn: $( ".playlist nav .close" ),

	// ctrl
	ctrl: $( ".ctrl" ),

		// Slider position
			// CurrentTime
			ctrlSliderCurrentTime: $( ".ctrl .cuteslider.position" ),
			// Thumbnail
			ctrlThumbnail: $( ".ctrl .thumbnail" ),
			ctrlThumbnailVideo: $( ".ctrl .thumbnail video" ),
			ctrlThumbnailCanvas: $( ".ctrl .thumbnail canvas" ),

		// Left
			// Open, stop, prev, play/pause, next
			ctrlOpenBtn: $( ".ctrl .open" ),
			ctrlPlayBtn: $( ".ctrl .play" ),
			ctrlStopBtn: $( ".ctrl .stop" ),
			ctrlPrevBtn: $( ".ctrl .prev" ),
			ctrlNextBtn: $( ".ctrl .next" ),
			// Volume
			ctrlVolumeIcon: $( ".ctrl .volume .fa" ),
			ctrlVolumeSlider: $( ".ctrl .volume .cuteslider" ),
			// Time
			ctrlTimeText: $( ".ctrl .txt.position" ),
			ctrlTimeCurrent: $( ".ctrl .position .current" ),
			ctrlTimeRemaining: $( ".ctrl .position .remaining" ),
			ctrlTimeDuration: $( ".ctrl .position .duration" ),

		// Right
			// Visualisations
			ctrlVisualBtn: $( ".ctrl .btn.visu" ),
			ctrlVisualIcon: $( ".ctrl .visu .fa" ),
			ctrlVisualToggle: $( ".ctrl .visu .slidebutton" ),
			ctrlVisualCheckbox: $( ".ctrl .visu input" ),
			ctrlVisualList: $( ".ctrl .visu ul" ),
			// Brightness
			ctrlBrightnessIcon: $( ".ctrl .brightness > .fa" ),
			ctrlBrightnessSlider: $( ".ctrl .brightness .cuteslider" ),
			ctrlBrightnessValue: $( ".ctrl .brightness .val" ),
			// Subtitles
			ctrlSubtitlesBtn: $( ".ctrl .btn.subtitles" ),
			ctrlSubtitlesIcon: $( ".ctrl .subtitles .fa" ),
			ctrlSubtitlesToggle: $( ".ctrl .subtitles .slidebutton" ),
			ctrlSubtitlesCheckbox: $( ".ctrl .subtitles input" ),
			ctrlSubtitlesList: $( ".ctrl .subtitles ul" ),
			// Playlist toggle button
			ctrlPlaylistBtn: $( ".ctrl .btn-playlist" ),
			// Fullscreen
			ctrlFullscreenBtn: $( ".ctrl .btn.fullscreen" )
};

// Make sure all the selections above works.
for ( var key in dom ) {
	if ( dom[ key ].length === 0 ) {
		console.error( "dom." + key + " is empty." );
	}
}

// This can be considered like NULL for jQuery.
dom.empty = $();

})();
