(function() {

dom.jqPlayerVolumeIcon.click( api.video.muteToggle );

dom.jqPlayerVolumeSlider.change( function() {
	api.video.volume( this.value );
});

// Control the volume with the keyboard.
api.keyboard
	.shortcut( "ctrl+down", api.video.volume.bind( null, "-=.05" ) )
	.shortcut( "ctrl+up",   api.video.volume.bind( null, "+=.05" ) )
;

// Control the volume with the vertical mouse scroll.
dom.jqPlayerVideo.on( "wheel", function( e ) {
	api.video.volume( e.originalEvent.deltaY < 0
		? "+=.05"
		: "-=.05"
	);
});

// Force the volume to the max by default
api.video.volume( 1 );

})();
