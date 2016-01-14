(function() {

var
	ctxAudio,
	srcAudio,
	analyser,
	requestId,
	visu = {},
	nbVisu = 0,
	selectedVisu = $.noop,
	canvas = dom.jqPlayerCanvas[ 0 ],
	ctxCanvas = canvas.getContext( "2d" ),
	visuEnable = false
;

if ( window.AudioContext ) {
	ctxAudio = new AudioContext();
	analyser = ctxAudio.createAnalyser();
	srcAudio = ctxAudio.createMediaElementSource( dom.jqPlayerVideo[ 0 ] );
	srcAudio.connect( analyser );
	analyser.connect( ctxAudio.destination );
}

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
		if ( ctxAudio && !visuEnable ) {
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
			playerUI.visualisationsToggle( visuEnable = true );
		}
		return that;
	},
	visuOff: function() {
		if ( visuEnable ) {
			ctxCanvas.clearRect( 0, 0, canvas.width, canvas.height );
			cancelAnimationFrame( requestId );
			playerUI.visualisationsToggle( visuEnable = false );
		}
		return that;
	},
	visuToggle: function( b ) {
		if ( typeof b !== "boolean" ) {
			b = !visuEnable;
		}
		return b ? that.visuOn() : that.visuOff();
	}
};

})();
