(function() {

var
	jqBtnFScr = $( ".btn.fullscreen", dom.jqPlayerCtrl )
;

function fsToggle() {
	document.toggleFullscreen( document.documentElement );
	return false;
}

jqBtnFScr.click( fsToggle );

// Rewrite the F11-native fullscreen.
api.keyboard.shortcut( "F11", fsToggle );

// Toggle fullscreen by double clicking on the video.
dom.jqPlayerVideo.dblclick( fsToggle );

dom.jqDoc.on(
	      "fullscreenchange " +
	    "MSFullscreenChange " +
	   "mozfullscreenchange " +
	"webkitfullscreenchange",
	function() {
		playerUI.toggleFullscreen( document.isFullscreen() );
	}
);

})();
