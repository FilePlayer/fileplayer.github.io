(function() {

var
	ctxAudio,
	srcAudio,
	analyser
;

if ( window.AudioContext ) {
	ctx = new AudioContext();
	analyser = ctx.createAnalyser();
	srcAudio = ctx.createMediaElementSource( dom.jqPlayerVideo[ 0 ] );
	srcAudio.connect( analyser );
	analyser.connect( ctx.destination );
}

api.audio = that = {
	ctx: ctx,
	analyser: analyser
};

})();
