(function() {

var
	spdLvlCurrent,
	spdLvls = [
		 .02, .03, .06, .12,
		 .25, .33, .50, .67,
		 1, 1.25, 1.5, 2, 3,
		 4, 8, 16, 32, 64
	]
;

spdLvls.some( function( n, i ) {
	if ( n === 1 ) {
		spdLvlCurrent = i;
		return true;
	}
});

function speed( lvl ) {
	spdLvlCurrent = utils.range( 0, lvl, spdLvls.length - 1, spdLvlCurrent );
	api.video.playbackRate( spdLvls[ spdLvlCurrent ] )
	api.shortcutDesc( "Speed : " + api.video.playbackRate().toFixed( 2 ) + "x" );
}

// Controls the playbackRate.
api.keyboard
	.shortcut( "minus", speed.bind( null, "-=1" ) )
	.shortcut( "plus",  speed.bind( null, "+=1" ) )
;

})();
