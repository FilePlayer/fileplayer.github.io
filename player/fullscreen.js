(function() {

function fsToggle() {
	document.toggleFullscreen( document.documentElement );
	return false;
}

dom.jqPlayerFullscreenBtn.click( fsToggle );

// Rewrite the F11-native fullscreen.
api.keyboard.shortcut( "F11", fsToggle );

// Toggle fullscreen by double clicking on the video.
dom.jqPlayerVideo.dblclick( fsToggle );

})();
