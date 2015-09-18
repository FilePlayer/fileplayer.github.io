(function() {

var
	jqBtnSubtitles = $( ".btn.subtitles", playerAPI.jqControls )
;

jqBtnSubtitles.click( function() {
	playerAPI.subtitlesToggle();
	return false;
});

})();
