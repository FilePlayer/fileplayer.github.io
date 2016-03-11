"use strict";

(function() {

var
	requestId,
	frameObj,
	frameFn = $.noop,
	canvas = dom.screenCanvas[ 0 ],
	ctx = canvas.getContext( "2d" )
;

function frame( timestamp ) {
	frameObj.timestamp = timestamp;
	frameFn( frameObj );
	if ( ui.canvasDisplayed ) {
		requestId = requestAnimationFrame( frame );
	}
}

$.extend( ui, {
	canvasDisplayed: false,
	canvasToggle: function( b ) {
		if ( typeof b !== "boolean" ) {
			b = !ui.canvasDisplayed;
		}
		ui.canvasDisplayed = b;
		ctx.clearRect( 0, 0, canvas.width, canvas.height );
		dom.fileplayer.toggleClass( "canvas-displayed", b );
		if ( b ) {
			if ( !requestId ) {
				requestId = requestAnimationFrame( frame );
			}
		} else {
			cancelAnimationFrame( requestId );
			requestId = null;
		}
		return ui;
	},
	canvasRender: function( fn, obj ) {
		frameFn = fn || $.noop;
		frameObj = $.extend( obj, {
			ctxCanvas: ctx
		});
		return ui;
	}
});

})();
