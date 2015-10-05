(function() {

var
	elVideo = playerAPI.videoElement,
	spdCurrent = 1,
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

$.extend( playerAPI, {
	speed: function( s ) {
		if ( !arguments.length ) {
			return elVideo.playbackRate;
		}
		elVideo.playbackRate =
		spdCurrent = s;
		return this;
	}
});

function setSpd( lvl ) {
	spdLvlCurrent = utils.range( 0, lvl, spdLvls.length - 1, spdLvlCurrent );
	playerAPI
		.speed( spdLvls[ spdLvlCurrent ] )
		.shortcutDesc(
			"Vitesse : " +
			~~( playerAPI.speed() * 100 ) / 100 +
			"x"
		)
	;
}

playerAPI
	.addKeys( "minus", setSpd.bind( null, "-=1" ) )
	.addKeys( "plus",  setSpd.bind( null, "+=1" ) )
;

})();
