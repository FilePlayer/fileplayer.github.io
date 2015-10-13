(function() {

var
	jqBtnPlay = $( ".play", dom.jqPlayerCtrl ),
	jqBtnStop = $( ".stop", dom.jqPlayerCtrl )
;

jqBtnPlay.click( function() {
	api.video.playToggle();
});

jqBtnStop.click( function() {
	api.video.stop();
});

// Keyboard shortcup to: stop, play/pause.
api.keyboard
	.shortcut( "s", function() {
		api.video.stop();
		api.shortcutDesc( "Stop" );
	})
	.shortcut( " ", function() {
		api.video.playToggle();
		api.shortcutDesc( api.video.isPlaying() ? "Play" : "Pause" );
	})
;

})();
