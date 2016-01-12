(function() {

function fsToggle() {
	document.toggleFullscreen( document.documentElement );
}

dom.jqPlayerFullscreenBtn.click( fsToggle );

// Rewrite the F11-native fullscreen.
api.keyboard.shortcut( "F11", fsToggle );

// Toggle fullscreen by double clicking on the video.
dom.jqPlayerScreen.dblclick( fsToggle );

})();
