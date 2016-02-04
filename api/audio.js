"use strict";

(function() {

var
	that,
	ctx,
	src,
	analyser,
	gainNode,
	volume,
	volSave,
	video = dom.screenVideo[ 0 ]
;

function vol( v ) {
	if ( ctx ) {
		gainNode.gain.value = v;
	} else {
		video.volume = v;
	}
	playerUI.volume( volume = v );
	Cookies.set( "volume", v, { expires: 365 } );
}

video.volume = 1;

if ( window.AudioContext ) {
	ctx = new AudioContext();
	analyser = ctx.createAnalyser();
	gainNode = ctx.createGain();
	gainNode.gain.value = 1;
	src = ctx.createMediaElementSource( video );
	src.connect( analyser );
	analyser.connect( gainNode );
	gainNode.connect( ctx.destination );
}

api.audio = that = {
	ctx: ctx,
	analyser: analyser,

	// Volume/mute/unMute
	volume: function( v ) {
		if ( arguments.length === 0 ) {
			return volume;
		}
		vol( utils.range( 0, v, 1, volume ) );
		volSave = volume;
		return that;
	},
	mute: function() {
		volSave = volume;
		vol( 0 );
		return that;
	},
	unMute: function() {
		vol( volSave || 1 );
		return that;
	},
	isMuted: function() {
		return volume === 0;
	},
	muteToggle: function( b ) {
		if ( typeof b !== "boolean" ) {
			b = !that.isMuted();
		}
		return b ? that.mute() : that.unMute();
	}
};

})();
