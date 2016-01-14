(function() {

var
	requestId,
	visu = {},
	nbVisu = 0,
	selectedVisu = $.noop,
	analyser = api.audio.analyser,
	ctxAudio = api.audio.ctx,
	canvas = dom.jqPlayerCanvas[ 0 ],
	ctxCanvas = canvas.getContext( "2d" ),
	enable = false
;

api.visualisations = that = {
	add: function( name, fn ) {
		visu[ name ] = fn;
		return that;
	},
	resize: function() {
		canvas.width = api.video.elementWidth;
		canvas.height = api.video.elementHeight;
		return that;
	},
	select: function( name ) {
		selectedVisu = visu[ name ] || $.noop;
		return that;
	},
	enable: function() {
		if ( ctxAudio && !enable ) {
			analyser.fftSize = 4096;
			var info = {
				ctxCanvas: ctxCanvas,
				analyser: analyser,
				data: new Uint8Array( analyser.frequencyBinCount )
			};
			function frame( timestamp ) {
				selectedVisu( info );
				requestId = requestAnimationFrame( frame );
			}
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
		return b ? api.visualisations.enable() : api.visualisations.disable();
	}
};

})();