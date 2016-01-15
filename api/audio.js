"use strict";

(function() {

var
	that,
	ctx,
	src,
	analyser
;

if ( window.AudioContext ) {
	ctx = new AudioContext();
	analyser = ctx.createAnalyser();
	src = ctx.createMediaElementSource( dom.jqPlayerVideo[ 0 ] );
	src.connect( analyser );
	analyser.connect( ctx.destination );
}

api.audio = that = {
	ctx: ctx,
	analyser: analyser
};

})();
