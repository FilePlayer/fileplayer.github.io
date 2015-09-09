(function() {

var
	controls = window.player.controls,
	jqVideo = $( elVideo ),
	jqBtnVol = $( "#ctrl .btn.volume"),
	jqSliderVol = $( "#ctrl .slider.volume" )
;

$.extend( controls, {
	mute: function() {
		elVideo.muted = true;
		return this;
	},
	unmute: function() {
		elVideo.muted = false;
		if ( !elVideo.volume ) {
			elVideo.volume = 1;
		}
		return this;
	},
	muteToggle: function() {
		return elVideo.muted || !elVideo.volume
			? this.unmute()
			: this.mute()
		;
	},
	volume: function( v ) {
		elVideo.volume = v;
		return this;
	}
});

jqBtnVol.click( function() {
	controls.muteToggle();
	return false;
});

jqSliderVol.on( "input", function() {
	controls.volume( this.value );
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
controls.volume( 1 );

})();
