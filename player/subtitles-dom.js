(function() {

var
	jqSubtitlesActivator = $( ".menu.subtitles .menu-activator", dom.jqPlayerCtrl ),
	jqBtnSubtitles = $( ".slidebutton input", jqSubtitlesActivator )
;

jqSubtitlesActivator.click( function() {
	api.subtitles.toggle();
	jqBtnSubtitles.attr( "checked", function( index, attr ) {
		lg( attr === undefined ? "checked" : "" )
		return attr === undefined ? "checked" : undefined
	});
});

// Synchronisation's subtitles keyboard.
api.keyboard
	.shortcut( "g", api.subtitles.delay.bind( null, "-=.05" ) )
	.shortcut( "h", api.subtitles.delay.bind( null, "+=.05" ) )
;

})();
