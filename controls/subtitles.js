(function() {

var
	jqBtnSubtitles = $( ".btn.subtitles", playerAPI.jqControls )
;

jqBtnSubtitles.click( function() {
	playerAPI.subtitlesToggle();
	return false;
});

playerAPI
	.addKeys( "g", function() {
		playerAPI.subtitlesDelayRelative( -.05 );
	})
	.addKeys( "h", function() {
		playerAPI.subtitlesDelayRelative( +.05 );
	})
;

})();
