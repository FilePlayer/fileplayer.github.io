"use strict";

(function() {

dom.jqPlayerVolumeIcon.click( api.audio.muteToggle );

dom.jqPlayerVolumeSlider.change( function() {
	api.audio.volume( this.value );
});

function vol( n ) {
	api.audio.volume( n );
	playerUI.actionDesc( "Volume : " + utils.fPercent( api.audio.volume() ) );
}

// Control the volume with the keyboard.
api.keyboard
	.shortcut( "ctrl+down", vol.bind( null, "-=.05" ) )
	.shortcut( "ctrl+up",   vol.bind( null, "+=.05" ) )
;

// Control the volume with the vertical mouse scroll.
dom.jqPlayerScreen.on( "wheel", function( e ) {
	vol( e.originalEvent.deltaY < 0
		? "+=.05"
		: "-=.05"
	);
});

})();
