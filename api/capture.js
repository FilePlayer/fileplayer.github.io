"use strict";

(function() {

var
	canvasCapture = document.createElement( "canvas" ),
	ctx = canvasCapture.getContext( "2d" )
;

$.extend( api, {
	capture: function() {
		var
			canvas, w, h,
			dur = api.video.currentTime(),
			hr = ~~( dur / 3600 ),
			mn = ~~( dur / 60 ) % 60,
			sc = dur % 60,
			file = api.playlist.selectedFile()
		;

		if ( mn < 10 ) {
			mn = "0" + mn;
		}
		sc = ( sc < 10 ? "0" : "" ) + sc.toFixed( 2 );

		if ( file.type === "audio" ) {
			canvas = dom.screenCanvas[ 0 ];
		} else {
			canvas = canvasCapture;
			w = canvas.width = api.videoElement.videoWidth;
			h = canvas.height = api.videoElement.videoHeight;
			ctx.drawImage( api.videoElement, 0, 0, w, h );
		}

		return {
			href: canvas.toDataURL(),
			download: file.name.replace( /\s/g, "_" ) +
				"__at_" + hr + "h" + mn + "m" + sc + "s.png"
		};
	}
});

})();
