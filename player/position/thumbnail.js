(function() {

var
	jqThumbnail = $( ".thumbnail", playerAPI.jqPlayer ),
	thumbnailOW2 = jqThumbnail.outerWidth() / 2,
	
	// video
	jqVideo = $( "video", jqThumbnail ),
	elVideo = jqVideo[ 0 ],
	oldLeft,

	// loading
	jqLoading = $( ".loading", jqThumbnail ),

	// canvas
	jqCanvas = $( "canvas", jqThumbnail ),
	elCanvas = jqCanvas[ 0 ],
	canvasCtx = elCanvas.getContext( "2d" ),
	canvasW = jqCanvas.width(),
	canvasH = jqCanvas.height(),
	cleared,
	currentImg,

	// cache
	imagesCache,

	// slider.position
	jqElement_cuteSlider = $( ".cuteSlider.position", playerAPI.jqControls ),
	jqCuteSliderContainer = jqElement_cuteSlider.parent()
;

elCanvas.width = canvasW;
elCanvas.height = canvasH;
elVideo.muted = true;

function loading( b ) {
	jqThumbnail.toggleClass( "loading", b );
}

function clearCanvas() {
	if ( !cleared ) {
		cleared = true;
		currentImg = undefined;
		canvasCtx.clearRect( 0, 0, canvasW, canvasH );
	}
}

$.extend( playerAPI, {
	thumbnailInit: function() {
		this.thumbnailClear();
		imagesCache = new Array( Math.ceil( playerAPI.duration() ) );
		return this;
	},
	thumbnailClear: function() {
		imagesCache = undefined;
		imagesCacheSize = 0;
		clearCanvas();
		jqCuteSliderContainer.attr( "data-tooltip-content", null );
		lg("thumbnailClear: "+jqCuteSliderContainer.attr( "data-tooltip-content"))
		return this;
	}
});

function searchImageInCache( sec ) {
	var img;
	if ( imagesCache ) {
		sec = ~~sec;
		for ( var i = 0; i < 30; ++i ) {
			img = imagesCache[ sec - i ] || imagesCache[ sec + i ];
			if ( img ) {
				return img;
			}
		}
	}
	return img;
}

jqVideo.on( "timeupdate", function() {
	var
		x, y, w, h,
		videoRatio,
		sec = ~~elVideo.currentTime,
		cache = imagesCache,
		img = cache && cache[ sec ]
	;
	loading( false );
	if ( cache ) {
		if ( !img ) {
			videoRatio = elVideo.videoWidth / elVideo.videoHeight;
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
			cache[ sec ] = canvasCtx.getImageData( x, y, w, h );
			++imagesCacheSize;
		}
	}
});

jqElement_cuteSlider
	.mouseenter( function() { if ( elVideo.duration ) { elVideo.play();  } } )
	.mouseleave( function() { if ( elVideo.duration ) { elVideo.pause(); } } )
	.mousemove( function( e ) {
		if ( elVideo.duration ) {
			var
				margin = jqElement_cuteSlider.offset().left,
				left = ( e.pageX - margin )
			;
			if ( left !== oldLeft ) {
				var
					img,
					width = jqElement_cuteSlider.width(),
					sec = ( left / width ) * elVideo.duration,
					limit = thumbnailOW2 - margin
				;
				oldLeft = left;
				jqThumbnail.css(
					"left",
					utils.range( limit, left, width - limit )
				);
				jqCuteSliderContainer.attr(
					"data-tooltip-content",
					utils.secondsToString( sec )
				);
				if ( elVideo.duration ) {
					loading( true );
					img = searchImageInCache( sec );
					if ( !img ) {
						clearCanvas();
					} else if ( img !== currentImg ) {
						cleared = false;
						canvasCtx.putImageData(
							currentImg = img,
							( canvasW - img.width ) / 2,
							( canvasH - img.height ) / 2
						);
					}
					elVideo.currentTime = sec;
				}
			}
		}
	})
;

})();
