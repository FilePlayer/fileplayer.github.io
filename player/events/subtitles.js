"use strict";

(function() {

dom.ctrlSubtitlesToggle
	.add( dom.ctrlSubtitlesIcon )
		.click( api.subtitles.toggle )
;

function del( time ) {
	return api.subtitles.delay.bind( null, time );
}

// Synchronisation's subtitles keyboard.
api.keyboard
	.shortcut( "g",       del( "-=.05" ) )
	.shortcut( "h",       del( "+=.05" ) )
	.shortcut( "shift+g", del( "-=.25" ) )
	.shortcut( "shift+h", del( "+=.25" ) )
	.shortcut( "alt+g",   del( "-=1" ) )
	.shortcut( "alt+h",   del( "+=1" ) )
	.shortcut( "ctrl+g",  del( "-=5" ) )
	.shortcut( "ctrl+h",  del( "+=5" ) )
;

})();
