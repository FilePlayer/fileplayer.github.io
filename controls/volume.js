(function() {

var
	elVideo = playerAPI.videoElement,
	jqBtnVol = $( ".btn.volume", playerAPI.jqControls ),
	jqIconVol = $( ".fa", jqBtnVol ),
	jqElement_cuteSlider = $( ".cuteSlider", jqBtnVol ),
	jqCuteSliderContainer = jqElement_cuteSlider.parent()
;

$.extend( playerAPI, {
	mute: function( b ) {
		if ( !arguments.length ) {
			return elVideo.muted || !elVideo.volume;
		}
		elVideo.muted = b;
		if ( !b && !elVideo.volume ) {
			elVideo.volume = 1;
		}
		return this;
	},
	muteToggle: function() {
		return this.mute( !this.mute() );
	},
	volume: function( v ) {
		if ( !arguments.length ) {
			return elVideo.volume;
		}
		if ( elVideo.volume = utils.range( 0, v, 1, elVideo.volume ) ) {
			elVideo.muted = false;
		}
		return this;
	}
});

jqIconVol.click( function() {
	playerAPI.muteToggle();
	return false;
});

jqElement_cuteSlider.change( function() {
	playerAPI.volume( this.value );
});

function volStr() {
	return "Volume : " + Math.round( playerAPI.volume() * 100 ) + " %";
}

function volume( v ) {
	playerAPI
		.volume( v )
		.shortcutDesc( volStr() )
	;
}

function onvolumechange() {
	var
		isMuted = playerAPI.mute(),
		volume = playerAPI.volume()
	;
	// Update the icon with 3 different levels.
	jqIconVol
		.removeClass( "fa-volume-off fa-volume-down fa-volume-up" )
		.addClass(
			isMuted
				? "fa-volume-off"
				: volume < .5
					? "fa-volume-down"
					: "fa-volume-up"
		)
	;
	// Put the slider at 0 when is muted.
	jqElement_cuteSlider.element().val( isMuted ? 0 : volume );
	// Update the mouse's helper.
	jqIconVol.attr( "data-tooltip-content", isMuted ? "Unmute" : "Mute" );
	jqCuteSliderContainer.attr( "data-tooltip-content", volStr() );
}

playerAPI
	// Control the volume with the keyboard.
	.addKeys( "ctrl+down", volume.bind( null, "-=.05" ) )
	.addKeys( "ctrl+up",   volume.bind( null, "+=.05" ) )
	.jqVideoElement
		// Sync the UI/controls with `elVideo.volume/muted`.
		.on( "volumechange", onvolumechange )
		// Control the volume with the vertical mouse scroll.
		.on( "wheel", function( e ) {
			volume( e.originalEvent.deltaY < 0
				? "+=.05"
				: "-=.05"
			);
		})
;

// Force the volume to the max by default
playerAPI.volume( 1 );

// Setting the volume to 1 will not trigger the `onvolumechange` event
// if the browser has already set the volume to 1.
onvolumechange();

})();
