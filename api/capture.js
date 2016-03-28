"use strict";

api.capture = function() {
	var
		canvasCapture = document.createElement( "canvas" ),
		canvasCtx = canvasCapture.getContext( "2d" )
	;

	return function() {
		var
			canvas,
			dur = api.video.currentTime(),
			hr = ~~( dur / 3600 ),
			mn = ~~( dur / 60 ) % 60,
			sc = dur % 60,
			file = api.playlist.selectedFile()
		;

		if ( file.type === "audio" ) {
			canvas = ui.visualizerCanvas();
		} else if ( ui.video360Enabled ) {
			canvas = ui.canvasWebgl.canvas;
		} else {
			canvas = canvasCapture;
			canvasCtx.drawImage(
				api.videoElement, 0, 0,
				canvas.width = api.videoElement.videoWidth,
				canvas.height = api.videoElement.videoHeight
			);
		}

		if ( mn < 10 ) {
			mn = "0" + mn;
		}
		sc = ( sc < 10 ? "0" : "" ) + sc.toFixed( 2 );

		return {
			href: canvas.toDataURL(),
			download: file.name.replace( /\s/g, "_" ) +
				"__at_" + hr + "h" + mn + "m" + sc + "s.png"
		};
	}
}();
