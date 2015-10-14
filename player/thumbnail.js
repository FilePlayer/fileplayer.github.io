(function() {

var
	jqThumbnail = dom.jqPlayerThumbnail,
	thumbnailOW2 = jqThumbnail.outerWidth() / 2,
	
	// video
	jqVideo = dom.jqPlayerThumbnailVideo,
	elVideo = dom.elPlayerThumbnailVideo,
	oldLeft,

	// loading
	jqLoading = $( ".loading", jqThumbnail ),

	// slider.position
	jqElement_cuteSlider = $( ".cuteSlider.position", dom.jqControls ),
	jqCuteSliderContainer = jqElement_cuteSlider.parent()
;

elVideo.muted = true;

function loading( b ) {
	jqThumbnail.toggleClass( "loading", b );
}

jqVideo.on( "timeupdate", function() {
	var sec = ~~elVideo.currentTime;
	loading( false );
	if (
		elVideo.duration &&
		!api.thumbnail.cache.getImage( sec )
	) {
		api.thumbnail.canvas.drawFromVideo();
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
					api.thumbnail.canvas.drawFromImg(
						api.thumbnail.cache.getImage( sec, 30 )
					);
					elVideo.currentTime = sec;
				}
			}
		}
	})
;

})();
