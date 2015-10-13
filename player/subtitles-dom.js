(function() {

var
	jqBtnSubtitles = $( ".btn.subtitles", dom.jqPlayerCtrl )
;

jqBtnSubtitles.click( function() {
	api.subtitles.toggle();
});

// Synchronisation's subtitles keyboard.
api.keyboard
	.shortcut( "g", api.subtitles.delay.bind( null, "-=.05" ) )
	.shortcut( "h", api.subtitles.delay.bind( null, "+=.05" ) )
;

})();
