(function() {

var
	controls = window.player.controls,
	jqVideo = $( elVideo ),
	jqBtnPlay = $( "#ctrl .play" )
;

$.extend( controls, {
	play: function() {
		elVideo.play();
		return this;
	},
	pause: function() {
		elVideo.pause();
		return this;
	},
	playToggle: function() {
		return elVideo.paused
			? this.play()
			: this.pause()
		;
	}
});

jqBtnPlay.click( function() {
	controls.playToggle();
	return false;
});

// Update the UI/controls in live
jqVideo
	.on( "play pause", function() {
		jqBtnPlay
			.removeClass( "fa-play fa-pause" )
			.addClass(
				elVideo.paused
					? "fa-play"
					: "fa-pause"
			)
		;
	})
;

})();
