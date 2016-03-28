"use strict";

(function() {

function Canvas( jqCanvas, ctxType ) {
	this.displayed = false;
	this.ctxType = ctxType;
	this.jqCanvas = jqCanvas;
	this.canvas = jqCanvas[ 0 ];
	this.ctx = jqCanvas[ 0 ].getContext( ctxType, ctxType === "2d" ? {} : {
		preserveDrawingBuffer: true
	});
	this.render( null );
}

Canvas.prototype = {
	render: function( fn, obj ) {
		this.frameFn = fn || $.noop;
		this.frameObj = $.extend( obj, {
			ctxCanvas: this.ctx
		});
		return this;
	},
	frame: function( timestamp ) {
		this.frameObj.timestamp = timestamp;
		this.frameFn( this.frameObj );
		if ( this.displayed ) {
			this.requestId = requestAnimationFrame( this.frame.bind( this ) );
		}
	},
	toggle: function( b ) {
		if ( typeof b !== "boolean" ) {
			b = !this.displayed;
		}
		this.displayed = b;
		if ( this.ctxType === "2d" ) {
			this.ctx.clearRect( 0, 0, this.canvas.width, this.canvas.height );
		}
		if ( !b ) {
			cancelAnimationFrame( this.requestId );
			this.requestId = null;
		} else if ( !this.requestId ) {
			this.requestId = requestAnimationFrame( this.frame.bind( this ) );
		}
		this.jqCanvas.css( "display", b ? "block" : "none" );
		return this;
	}
};

ui.canvas2d = new Canvas( dom.screenCanvas2d, "2d" );
ui.canvasWebgl = new Canvas( dom.screenCanvasWebgl, "webgl" );

})();
