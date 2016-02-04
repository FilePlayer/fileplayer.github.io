"use strict";

(function() {

var
	that,
	jqThumbnail = dom.ctrlThumbnail,
	elVideo = dom.ctrlThumbnailVideo[ 0 ],
	jqCanvas = dom.ctrlThumbnailCanvas,
	elCanvas = jqCanvas[ 0 ],

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
			ratio = api.video.ratio
		;
		if ( ratio > 1 ) {
			w = canvasW;
			h = canvasW / ratio;
			x = 0;
			y = ( canvasH - h ) / 2;
		} else {
			w = canvasH * ratio;
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
