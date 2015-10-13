(function() {

var
	that,
	jqThumbnail = dom.jqPlayerThumbnail,
	elVideo = dom.elPlayerThumbnailVideo,
	jqCanvas = dom.jqPlayerThumbnailCanvas,
	elCanvas = dom.elPlayerThumbnailCanvas,

	canvasCtx = elCanvas.getContext( "2d" ),
	canvasW = jqCanvas.width(),
	canvasH = jqCanvas.height(),
	currentImg
;

elCanvas.width = canvasW;
elCanvas.height = canvasH;

api.thumbnail.canvas = that = {
	drawFromImg: function( img ) {
		if ( img !== currentImg ) {
			if ( currentImg = img ) {
				canvasCtx.putImageData(
					img,
					( canvasW - img.width ) / 2,
					( canvasH - img.height ) / 2
				);
			} else {
				canvasCtx.clearRect( 0, 0, canvasW, canvasH );
			}
		}
		return that;
	},
	drawFromVideo: function() {
		var
			x, y, w, h,
			videoRatio = elVideo.videoWidth / elVideo.videoHeight
		;
		if ( videoRatio > 1 ) {
			w = canvasW;
			h = canvasW / videoRatio;
			x = 0;
			y = ( canvasH - h ) / 2;
		} else {
			w = canvasH * videoRatio;
			h = canvasH;
			x = ( canvasW - w ) / 2;
			y = 0;
		}
		canvasCtx.drawImage( elVideo, x, y, w, h );
		currentImg = canvasCtx.getImageData( x, y, w, h );
		api.thumbnail.cache.newImage( ~~elVideo.currentTime, currentImg );
		return that;
	}
};

})();
