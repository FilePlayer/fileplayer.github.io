(function() {

var
	elDoc = document.documentElement,
	jqBtnFScr = $( ".btn.fullscreen", playerAPI.jqControls )
;

elDoc.requestFullscreen =
	elDoc      .requestFullscreen ||
	elDoc   .mozRequestFullScreen ||
	elDoc.webkitRequestFullscreen ||
	$.noop
;
document.cancelFullscreen =
	document.      cancelFullscreen ||
	document.   mozCancelFullScreen ||
	document.webkitCancelFullScreen ||
	$.noop
;

$.extend( playerAPI, {
	fullscreen: function( b ) {
		if ( !arguments.length ) {
			return (
				document.fullScreen ||
				document.mozFullScreen ||
				document.webkitIsFullScreen ||
				false
			);
		}
		if ( b ) {
			elDoc.requestFullscreen();
		} else {
			document.cancelFullscreen();
		}
		return this;
	},
	fullscreenToggle: function() {
		return this.fullscreen( !this.fullscreen() );
	}
});

function fsToggle() {
	playerAPI.fullscreenToggle();
	return false;
}

jqBtnFScr.click( fsToggle );

// Rewrite the F11-native fullscreen.
playerAPI.addKeys( "F11", fsToggle );

// Toggle fullscreen by double clicking on the video.
playerAPI.jqVideoElement.dblclick( fsToggle );

function fsChange() {
	var isFs = playerAPI.fullscreen();
	jqBtnFScr
		.removeClass( "fa-expand fa-compress" )
		.addClass( isFs ? "fa-compress" : "fa-expand" )
		// Update the mouse's helper.
		.attr( "data-tooltip-content", isFs ? "Exit full screen" : "Full screen" )
	;
}

playerAPI.jqDocument
	.on( "fullscreenchange mozfullscreenchange webkitfullscreenchange", fsChange )
;

// Continue the initialisation by simulate a `onfullscreenchange` event.
fsChange();

})();
