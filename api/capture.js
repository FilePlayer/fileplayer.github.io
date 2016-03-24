"use strict";

(function() {

$.extend( api, {
	capture: function() {
		var
			canvas,
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
			canvas = ui.visualizerCanvas();
		} else {
			canvas = canvasTmp( api.videoElement );
		}

		return {
			href: canvas.toDataURL(),
			download: file.name.replace( /\s/g, "_" ) +
				"__at_" + hr + "h" + mn + "m" + sc + "s.png"
		};
	}
});

})();
