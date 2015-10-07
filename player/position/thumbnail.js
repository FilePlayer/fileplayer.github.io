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
		imagesCache = new Array( Math.ceil( playerAPI.duration() ) );
		currentImg = undefined;
		imagesCacheSize = 0;
		clearCanvas()
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
		sec = ~~elVideo.currentTime,
		cache = imagesCache,
		img = cache && cache[ sec ]
	;
	loading( false );
	if ( cache ) {
		if ( !img ) {
			canvasCtx.drawImage( elVideo, 0, 0, canvasW, canvasH );
			cache[ sec ] = canvasCtx.getImageData( 0, 0, canvasW, canvasH );
			++imagesCacheSize;
		}
	}
});

jqElement_cuteSlider
	.mouseenter( function() { elVideo.play();  } )
	.mouseleave( function() { elVideo.pause(); } )
	.mousemove( function( e ) {
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
					canvasCtx.putImageData( currentImg = img, 0, 0 );
				}
				elVideo.currentTime = sec;
			}
		}
	})
;

})();
