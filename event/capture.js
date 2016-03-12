"use strict";

dom.ctrlCaptureBtn.click( function() {
	if ( api.isLoaded ) {
		dom.ctrlCaptureBtn.attr( api.capture() );
	}
});
