"use strict";

(function() {

window.api = {
	version: "0.6.1",

	thumbnail: {}
};

dom.numVersion.text( api.version );

// dom.body.on("load") doesn't work.
document.body.onload = function() {
	lg( "body loaded" );
	dom.fileplayer.addClass( "ready" );
};

})();
