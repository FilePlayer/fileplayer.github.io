(function() {

var
	elVideo = playerAPI.videoElement,
	jqBtnVol = $( ".btn.volume", playerAPI.jqControls ),
	jqSliderVol = $( ".slider.volume", playerAPI.jqControls )
;

$.extend( playerAPI, {
	mute: function( b ) {
		if ( !arguments.length ) {
			return elVideo.muted;
		}
		elVideo.muted = b;
		if ( !b && !elVideo.volume ) {
			elVideo.volume = 1;
		}
		return this;
	},
	muteToggle: function() {
		return this.mute( !elVideo.muted && !!elVideo.volume );
	},
	volume: function( v ) {
		if ( !arguments.length ) {
			return elVideo.volume;
		}
		if ( v < 0 ) {
			v = 0;
		} else if ( v > 1 ) {
			v = 1;
		}
		elVideo.volume = v;
		if ( v ) {
			elVideo.muted = false;
		}
		return this;
	},
	volumeRelative: function( v ) {
		return this.volume( this.volume() + v );
	}
});

jqBtnVol.click( function() {
	playerAPI.muteToggle();
	return false;
});

jqSliderVol.on( "input", function() {
	playerAPI.volume( this.value );
});

playerAPI
	// Control the volume with the keyboard.
	.addKeys( "ctrl+down", function() { playerAPI.volumeRelative( -.05 ); })
	.addKeys( "ctrl+up",   function() { playerAPI.volumeRelative( +.05 ); })
	// Update the UI/controls in live
	.jqVideoElement
		.on( "volumechange", function() {
			jqBtnVol
				.removeClass( "fa-volume-off fa-volume-down fa-volume-up" )
				.addClass(
					elVideo.muted || elVideo.volume === 0
						? "fa-volume-off"
						: elVideo.volume < .5
							? "fa-volume-down"
							: "fa-volume-up"
				)
			;
			jqSliderVol.val( elVideo.muted
				? 0
				: elVideo.volume
			);
		})
;

// Force the volume to the max by default
playerAPI.volume( 1 );

})();
