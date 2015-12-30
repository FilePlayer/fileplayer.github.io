(function() {

dom.jqPlayerVolumeIcon.click( api.video.muteToggle );

dom.jqPlayerVolumeSlider.change( function() {
	api.video.volume( this.value );
});

function vol( n ) {
	api.video.volume( n );
	playerUI.actionDesc( "Volume : " + utils.fPercent( api.video.volume() ) );
}

// Control the volume with the keyboard.
api.keyboard
	.shortcut( "ctrl+down", vol.bind( null, "-=.05" ) )
	.shortcut( "ctrl+up",   vol.bind( null, "+=.05" ) )
;

// Control the volume with the vertical mouse scroll.
dom.jqPlayerVideo.on( "wheel", function( e ) {
	vol( e.originalEvent.deltaY < 0
		? "+=.05"
		: "-=.05"
	);
});

})();
