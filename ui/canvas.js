"use strict";

(function() {

var
	requestId,
	jqCanvas = dom.screenCanvas,
	canvas = jqCanvas[ 0 ],
	ctx = canvas.getContext( "2d" )
;

$.extend( ui, {
	canvasDisplay: false,
	canvasToggle: function( b ) {
		if ( typeof b !== "boolean" ) {
			b = !ui.canvasDisplay;
		}
		if ( b !== ui.canvasDisplay ) {
			ui.canvasDisplay = b;
			jqCanvas.toggle( b );
		}
		return ui;
	},
	canvasRender: function( fn, obj ) {
		function frame( timestamp ) {
			obj.timestamp = timestamp;
			fn( obj );
			requestId = requestAnimationFrame( frame );
		}
		ctx.clearRect( 0, 0, canvas.width, canvas.height );
		cancelAnimationFrame( requestId );
		if ( fn ) {
			obj = $.extend( obj, {
				ctxCanvas: ctx
			});
			requestId = requestAnimationFrame( frame );
		}
		return ui;
	}
});

})();
