"use strict";

(function() {

dom.window.resize( ui.windowResize );

function fsToggle() {
	document.toggleFullscreen( document.documentElement );
}

dom.ctrlFullscreenBtn.click( fsToggle );

// Rewrite the F11-native fullscreen.
api.keyboard.shortcut( "F11", fsToggle );

// Toggle fullscreen by double clicking on the video.
dom.screen.dblclick( fsToggle );

dom.doc.on(
	      "fullscreenchange " +
	    "MSFullscreenChange " +
	   "mozfullscreenchange " +
	"webkitfullscreenchange",
	function() {
		lg( "ON: fullscreenchange" );
		ui.fullscreenToggle( document.isFullscreen() );
	}
);

})();
