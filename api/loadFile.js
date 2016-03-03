"use strict";

(function() {

$.extend( api, {
	isLoading: false,
	isLoaded: false,
	videoElement: dom.screenVideo,

	loadFile: function( fwrap ) {
		var
			cors = fwrap.isLocal || fwrap.cors,
			wasLooping = api.video.loop()
		;
		api.video.pause();
		api.isLoading = true;
		api.isLoaded = false;
		api.video.type = fwrap.type; // TODO: remove this line...
		dom.fileplayer.toggleClass( "webaudio", cors );
		api.videoElement = ( cors ? dom.screenVideo : dom.screenVideoDistant )[ 0 ];		
		api.videoElement.src = fwrap.url;
		api.video.loop( wasLooping );
		if ( fwrap.type === "video" ) {
			dom.ctrlThumbnailVideo.attr( {
				crossOrigin: cors ? "anonymous" : null,
				src: fwrap.url
			});
		}
		ui
			.loading()
			.seeking()
		;
		return api;
	},
	fileLoaded: function() {
		api.isLoading = false;
		api.isLoaded = true;
		api.imageRatio = api.videoElement.videoWidth / api.videoElement.videoHeight;
		api.screen.resize();
		api.video.playbackRate( 1 );
		ui.subtitlesResizeUpdate();
		return api;
	}
});

})();
