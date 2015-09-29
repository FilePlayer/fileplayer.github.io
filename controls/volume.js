(function() {

var
	elVideo = playerAPI.videoElement,
	jqBtnVol = $( ".btn.volume", playerAPI.jqControls ),
	jqIconVol = $( ".fa", jqBtnVol ),
	jqElement_cuteSlider = $( ".cuteSlider", jqBtnVol )
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
		elVideo.volume = v =
			v < 0 ? 0 :
			v < 1 ? v : 1
		;
		if ( v ) {
			elVideo.muted = false;
		}
		return this;
	},
	volumeRelative: function( v ) {
		return this.volume( this.volume() + v );
	}
});

jqIconVol.click( function() {
	playerAPI.muteToggle();
	return false;
});

jqElement_cuteSlider.change( function() {
	playerAPI.volume( this.value );
});

function volRel( v ) {
	playerAPI
		.volumeRelative( v )
		.shortcutDesc(
			"Volume : " +
			Math.round( playerAPI.volume() * 100 ) +
			" %"
		)
	;
}

function onvolumechange() {
	var isMuted = playerAPI.mute();
	// Update the icon with 3 different levels.
	jqIconVol
		.removeClass( "fa-volume-off fa-volume-down fa-volume-up" )
		.addClass(
			isMuted
				? "fa-volume-off"
				: elVideo.volume < .5
					? "fa-volume-down"
					: "fa-volume-up"
		)
	;
	// Put the slider at 0 when is muted.
	jqElement_cuteSlider.element().val( isMuted ? 0 : elVideo.volume );
}

playerAPI
	// Control the volume with the keyboard.
	.addKeys( "ctrl+down", volRel.bind( null, -.05 ) )
	.addKeys( "ctrl+up",   volRel.bind( null, +.05 ) )
	.jqVideoElement
		// Sync the UI/controls with `elVideo.volume/muted`.
		.on( "volumechange", onvolumechange )
		// Control the volume with the vertical mouse scroll.
		.on( "wheel", function( e ) {
			volRel( e.originalEvent.deltaY < 0
				? +.05
				: -.05
			);
		})
;

// Force the volume to the max by default
playerAPI.volume( 1 );

// Setting the volume to 1 will not trigger the `onvolumechange` event
// if the browser has already set the volume to 1.
onvolumechange();

})();
