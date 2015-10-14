(function() {

window.dom = {
	jqDoc: $( document ),
	jqBody: $( document.body ),
	jqPlayer: $( "#player" ),
	jqPlayerTitle: $( "#titleFile" ),
	jqPlayerShortcutDesc: $( "#shortcutDesc" ),
	jqPlayerCue: $( "#cues > *" ),
	jqPlayerCtrl: $( "#ctrl" ),
	jqPlayerSliderCurrentTime: $( "#ctrl .cuteSlider.position" ),
	jqPlayerSubtitlesBtn: $( "#ctrl .btn.subtitles" ),
	jqPlayerPlayBtn: $( "#ctrl .play" ),
	jqPlayerStopBtn: $( "#ctrl .stop" ),
	jqPlayerFullscreenBtn: $( "#ctrl .btn.fullscreen" ),
	jqPlayerVolumeIcon: $( "#ctrl .volume .fa" ),
	jqPlayerVolumeSlider: $( "#ctrl .volume .cuteSlider" ),
	jqPlayerTimeText: $( "#player .txt.position" ),
	jqPlayerTimeCurrent: $( "#player .position .current" ),
	jqPlayerTimeRemaining: $( "#player .position .remaining" ),
	jqPlayerTimeDuration: $( "#player .position .duration" ),
	jqPlayerVideo: $( "#player video.main" ),
	jqPlayerThumbnail: $( "#player .thumbnail" ),
	jqPlayerThumbnailVideo: $( "#player .thumbnail video" ),
	jqPlayerThumbnailCanvas: $( "#player .thumbnail canvas" )
};

// Make sure all the selections above works.
for ( var key in window.dom ) {
	if ( window.dom[ key ].length === 0 ) {
		console.error( "dom." + key + " is empty." );
	}
}

})();
