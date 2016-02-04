"use strict";

(function() {

var
	that,
	requestId,
	visu = {},
	nbVisu = 0,
	selectedVisu = $.noop,
	analyser = api.audio.analyser,
	ctxAudio = api.audio.ctx,
	canvas = dom.screenCanvas[ 0 ],
	ctxCanvas = canvas.getContext( "2d" ),
	enable = false,
	frameInfo = {
		ctxCanvas: ctxCanvas,
		analyser: analyser
	}
;

api.visualisations = that = {
	add: function( name, fn ) {
		visu[ name ] = fn;
		return that;
	},
	resize: function() {
		canvas.width = api.screen.width;
		canvas.height = api.screen.height;
		return that;
	},
	select: function( name ) {
		selectedVisu = visu[ name ] || $.noop;
		return that;
	},
	enable: function() {
		function frame( timestamp ) {
			selectedVisu( frameInfo );
			requestId = requestAnimationFrame( frame );
		}
		if ( ctxAudio && !enable ) {
			analyser.fftSize = 4096;
			frameInfo.data = new Uint8Array( analyser.frequencyBinCount );
			requestId = requestAnimationFrame( frame );
			playerUI.visualisationsToggle( enable = true );
		}
		return that;
	},
	disable: function() {
		if ( enable ) {
			ctxCanvas.clearRect( 0, 0, canvas.width, canvas.height );
			cancelAnimationFrame( requestId );
			playerUI.visualisationsToggle( enable = false );
		}
		return that;
	},
	toggle: function( b ) {
		if ( typeof b !== "boolean" ) {
			b = !enable;
		}
		return b ? that.enable() : that.disable();
	}
};

})();