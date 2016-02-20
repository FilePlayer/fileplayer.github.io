"use strict";

(function() {

var
	loaded = false
;

window.api = {
	version: "0.7.0",

	thumbnail: {}
};

dom.numVersion.text( api.version );

// dom.body.on("load") doesn't work.
document.body.onload = function() {
	if ( !loaded ) {
		lg( "body loaded" );
		loaded = true;
		dom.fileplayer.addClass( "ready" );
	}
};

// A timeout to the body loading.
setTimeout( document.body.onload, 3000 );

})();
