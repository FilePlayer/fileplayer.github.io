"use strict";

(function() {

var
	canvasCapture = document.createElement( "canvas" ),
	ctx = canvasCapture.getContext( "2d" )
;

dom.ctrlCaptureBtn.click( function() {
	var
		w, h,
		dur, hr, mn, sc,
		file, canvas
	;

	if ( api.isLoaded ) {
		file = api.playlist.selectedFile();

		if ( file.type === "audio" ) {
			canvas = dom.screenCanvas[ 0 ];
		} else {
			canvas = canvasCapture;
			w = canvas.width = api.videoElement.videoWidth;
			h = canvas.height = api.videoElement.videoHeight;
			ctx.drawImage( api.videoElement, 0, 0, w, h );
		}

		// Write the specific time in the screenshot's name.
		// Be careful by not adding any forbidden char like ":>/" etc.
		dur = api.video.currentTime();
		hr = ~~( dur / 3600 );
		mn = ~~( dur / 60 ) % 60;
		sc = dur % 60;
		if ( mn < 10 ) {
			mn = "0" + mn;
		}
		sc = ( sc < 10 ? "0" : "" ) + sc.toFixed( 2 );

		dom.ctrlCaptureBtn.attr( {
			href: canvas.toDataURL(),
			download: file.name.replace( /\s/g, "_" ) +
				"__at_" + hr + "h" + mn + "m" + sc + "s.png"
		});
	}
});

})();
