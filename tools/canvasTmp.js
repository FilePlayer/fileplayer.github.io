"use strict";

(function() {
window.canvasTmp = function( v ) {
	var
		h, w,
		canvas = document.createElement( "canvas" ),
		ctx = canvas.getContext( "2d" )
	;
	w = canvas.width = v.videoWidth;
	h = canvas.height = v.videoHeight;
	ctx.drawImage( v, 0, 0, w, h );
	return canvas;
};

})();