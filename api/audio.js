(function() {

var
	requestId,
	visu = {},
	nbVisu = 0,
	selectedVisu = $.noop,
	canvas = dom.jqPlayerCanvas[ 0 ],
	ctxCanvas = canvas.getContext( '2d' ),
	ctxAudio = new AudioContext(),
	analyser = ctxAudio.createAnalyser(),
	src = ctxAudio.createMediaElementSource( dom.jqPlayerVideo[ 0 ] ),
	visuEnable = false
;

src.connect( analyser );
analyser.connect( ctxAudio.destination );

api.audio = that = {
	addVisu: function( name, fn ) {
		visu[ name ] = fn;
		return that;
	},
	resize: function() {
		canvas.width = api.video.elementWidth;
		canvas.height = api.video.elementHeight;
		return that;
	},
	selectVisu: function( name ) {
		selectedVisu = visu[ name ] || $.noop;
		return that;
	},
	visuOn: function() {
		function frame( timestamp ) {
			ctxCanvas.clearRect( 0, 0, canvas.width, canvas.height );
			selectedVisu( ctxCanvas, analyser );
			requestId = requestAnimationFrame( frame );
		}
		if ( !visuEnable ) {
			requestId = requestAnimationFrame( frame );
			visuEnable = true;
		}
		return that;
	},
	visuOff: function() {
		if ( visuEnable ) {
			cancelAnimationFrame( requestId );
			visuEnable = false;
		}
		return that;
	},
	visuToggle: function( b ) {
		if ( !arguments.length ) {
			b = !visuEnable;
		}
		return b ? that.visuOn() : that.visuOff();
	}
}

})();



