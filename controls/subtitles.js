(function() {

var
	jqBtnSubtitles = $( ".menu .subtitles .slidebutton", playerAPI.jqControls )
;

jqBtnSubtitles.click( function() {
	playerAPI.subtitlesToggle();
});

playerAPI
	.addKeys( "g", playerAPI.subtitlesDelay.bind( playerAPI, "-=.05" ) )
	.addKeys( "h", playerAPI.subtitlesDelay.bind( playerAPI, "+=.05" ) )
;

})();
