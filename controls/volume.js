(function() {

var
	jqVideo = $( elVideo ),
	jqBtnVol = $( "#ctrl .btn.volume"),
	jqSliderVol = $( "#ctrl .slider.volume" )
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
		elVideo.volume = v;
		if ( v ) {
			elVideo.muted = false;
		}
		return this;
	}
});

jqBtnVol.click( function() {
	playerAPI.muteToggle();
	return false;
});

jqSliderVol.on( "input", function() {
	playerAPI.volume( this.value );
});

// Update the UI/controls in live
jqVideo
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
