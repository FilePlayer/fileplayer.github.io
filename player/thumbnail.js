(function() {

var
	jqThumbnail = dom.jqPlayerThumbnail,
	thumbnailOW2 = jqThumbnail.outerWidth() / 2,
	
	// video
	elVideo = dom.jqPlayerThumbnailVideo[ 0 ],
	oldLeft,

	// slider.position
	jqSliderTime = dom.jqPlayerSliderCurrentTime,
	jqSliderTimeContainer = jqSliderTime.parent()
;

elVideo.muted = true;

function loading( b ) {
	jqThumbnail.toggleClass( "loading", b );
}

dom.jqPlayerThumbnailVideo.on( "timeupdate", function() {
	var sec = ~~elVideo.currentTime;
	loading( false );
	if (
		elVideo.duration &&
		!api.thumbnail.cache.getImage( sec )
	) {
		api.thumbnail.canvas.drawFromVideo();
	}
});

jqSliderTime
	.mouseenter( function() { if ( elVideo.duration ) { elVideo.play();  } } )
	.mouseleave( function() { if ( elVideo.duration ) { elVideo.pause(); } } )
	.mousemove( function( e ) {
		if ( elVideo.duration ) {
			var
				margin = jqSliderTime.offset().left,
				left = ( e.pageX - margin )
			;
			if ( left !== oldLeft ) {
				var
					width = jqSliderTime.width(),
					sec = ( left / width ) * elVideo.duration,
					limit = thumbnailOW2 - margin
				;
				oldLeft = left;
				jqThumbnail.css(
					"left",
					utils.range( limit, left, width - limit )
				);
				jqSliderTimeContainer.attr(
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