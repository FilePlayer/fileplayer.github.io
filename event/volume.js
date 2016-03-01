"use strict";

(function() {

var vol = api.audio.volume;

dom.ctrlVolumeIcon.click( api.audio.muteToggle );

dom.ctrlVolumeSlider.change( function() {
	vol( this.value );
});

// Control the volume with the keyboard.
api.keyboard
	.shortcut( "ctrl+down", vol.bind( null, "-=.05" ) )
	.shortcut( "ctrl+up",   vol.bind( null, "+=.05" ) )
;

// Control the volume with the vertical mouse scroll.
dom.screen.on( "wheel", function( e ) {
	vol( e.originalEvent.deltaY < 0
		? "+=.05"
		: "-=.05"
	);
});

})();
