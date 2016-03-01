"use strict";

(function() {

var
	jqThumbnail = dom.ctrlThumbnail,
	thumbnailOW2 = jqThumbnail.outerWidth() / 2,
	isLoading = false,

	// video
	elVideo = dom.ctrlThumbnailVideo[ 0 ],
	oldLeft,

	// slider.position
	jqSliderTime = dom.ctrlCutesliderPosition,
	jqSliderTimeContainer = jqSliderTime.parent()
;

elVideo.muted = true;

function loading( b ) {
	if ( b !== isLoading ) {
		jqThumbnail.toggleClass( "loading", isLoading = b );
	}
}

dom.ctrlThumbnailVideo.on( "timeupdate", function() {
	loading( false );
	if (
		api.video.isLoaded() && api.video.mediaType === "video" &&
		!api.thumbnail.cache.getImage( ~~elVideo.currentTime )
	) {
		api.thumbnail.canvas.drawFromVideo();
	}
});

function play( b ) {
	if ( api.video.mediaType === "video" ) {
		b ? elVideo.play() : elVideo.pause();
	}
}

jqSliderTime
	.mouseenter( play.bind( null, true ) )
	.mouseleave( play.bind( null, false ) )
	.mousemove( function( e ) {
		if ( !api.video.isStopped() ) {
			var
				margin = jqSliderTime.offset().left,
				left = ( e.pageX - margin )
			;
			if ( left !== oldLeft ) {
				var
					width = jqSliderTime.width(),
					sec = ( left / width ) * api.video.duration(),
					limit = thumbnailOW2 - margin
				;
				oldLeft = left;
				jqSliderTimeContainer.attr(
					"data-tooltip-content",
					utils.secondsToString( sec )
				);
				if ( api.video.mediaType === "video" ) {
					loading( true );
					if ( elVideo.paused ) {
						elVideo.play();
					}
					jqThumbnail.css( "left",
						utils.range( limit, left, width - limit )
					);
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
