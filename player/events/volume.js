(function() {

dom.jqPlayerVolumeIcon.click( api.video.muteToggle );

dom.jqPlayerVolumeSlider.change( function() {
	api.video.volume( this.value );
});

function volumeKeys( v ) {
	api.video.volume( v );
	playerUI.actionDesc( "Volume : " + Math.round( api.video.volume() * 100 ) + " %" );
}

// Control the volume with the keyboard.
api.keyboard
	.shortcut( "ctrl+down", volumeKeys.bind( null, "-=.05" ) )
	.shortcut( "ctrl+up",   volumeKeys.bind( null, "+=.05" ) )
;

// Control the volume with the vertical mouse scroll.
dom.jqPlayerVideo.on( "wheel", function( e ) {
	volumeKeys( e.originalEvent.deltaY < 0
		? "+=.05"
		: "-=.05"
	);
});

// Force the volume to the max by default
api.video.volume( 1 );

})();
