"use strict";

(function() {

var
	video = dom.screenVideo[ 0 ],
	canvas = document.createElement( "canvas" ),
	ctx = canvas.getContext( "2d" )
;

dom.ctrlCaptureBtn.click( function() {
	var
		w = video.videoWidth,
		h = video.videoHeight,
		sec = api.video.currentTime(),
		hr = ~~( sec / 3600 ),
		mn = ~~( sec / 60 ) % 60,
		sc = sec % 60,
		wasPlaying = api.video.isPlaying()
	;

	if ( w && h ) {
		if ( mn < 10 ) {
			mn = "0" + mn;
		}
		sc = ( sc < 10 ? "0" : "" ) + sc.toFixed( 2 );
		canvas.width = w;
		canvas.height = h;

		// Pause the video to avoid any conflict and accelerate the screenshot.
		api.video.pause();
		ctx.drawImage( video, 0, 0, w, h );
		dom.ctrlCaptureBtn.attr( {
			href: canvas.toDataURL(),
			download: api.playlist.selectedFile().name.replace( /\s/g, "_" ) +
				"__at_" + hr + "h" + mn + "m" + sc + "s.png"
		});
		api.video.playToggle( wasPlaying );
	}
});

})();
