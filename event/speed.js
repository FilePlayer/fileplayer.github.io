"use strict";

(function() {

var
	spdLvls = [
		 .02, .03, .06, .12, .25, .33,
		 .5, .67, 1, 1.25, 1.5, 2, 3, 4,
		 8, 16, 32, 64
	],
	len = spdLvls.length
;

function speed( dir ) {
	var
		newSpd,
		i = 1,
		spd = api.video.playbackRate()
	;

	for ( ; i < len; ++i ) {
		if ( spd <= spdLvls[ i ] ) {
			newSpd = spdLvls[ dir < 0
				? i - 1
				: i + +( spd === spdLvls[ i ] )
			];
			break;
		}
	}
	api.video.playbackRate( newSpd || spd );
}

dom.ctrlSpeedSlider.change( function() {
	api.video.playbackRate( +this.value );
});

// Reset the speed by clicking on the icon.
dom.ctrlSpeedIcon.click( function() {
	api.video.playbackRate( 1 );
});

// + and - on the keyboard.
api.keyboard
	.shortcut( "minus", speed.bind( null, -1 ) )
	.shortcut( "plus",  speed.bind( null, +1 ) )
;

})();
