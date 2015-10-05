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

	// slider.position
	jqElement_cuteSlider = $( ".cuteSlider.position", playerAPI.jqControls ),
	jqCuteSliderContainer = jqElement_cuteSlider.parent()
;

elVideo.muted = true;

function loading( b ) {
	jqLoading.toggleClass( "hidden", !b );
}

$.extend( playerAPI, {
	thumbnailClear: function() {
		loading( false );
		return this;
	},
});

jqVideo.on( "timeupdate", function() {
	loading( false );
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
				elVideo.currentTime = sec;
			}
		}
	})
;

})();
