(function() {

dom.jqPlayerPlayBtn.click( api.video.playToggle );
dom.jqPlayerStopBtn.click( api.video.stop );

// Keyboard shortcup to: stop, play/pause.
api.keyboard
	.shortcut( "s", function() {
		api.video.stop();
		playerUI.actionDesc( "Stop" );
	})
	.shortcut( " ", function() {
		api.video.playToggle();
		playerUI.actionDesc( api.video.isPlaying() ? "Play" : "Pause" );
	})
;

})();
