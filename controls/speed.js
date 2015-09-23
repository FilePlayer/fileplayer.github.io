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
	},
	speedRelative: function( s ) {
		return this.speed( this.speed() + s );
	}
});

function setSpd( lvl ) {
	spdLvlCurrent = Math.min( Math.max( 0, lvl ), spdLvls.length - 1 );
	playerAPI
		.speed( spdLvls[ spdLvlCurrent ] )
		.shortcutDesc(
			"Vitesse : " +
			~~(playerAPI.speed() * 100) / 100 +
			"x"
		)
	;
}

playerAPI
	.addKeys( "minus", function() {
		setSpd( spdLvlCurrent - 1 );
	})
	.addKeys( "plus", function() {
		setSpd( spdLvlCurrent + 1 );
	})
;

})();
