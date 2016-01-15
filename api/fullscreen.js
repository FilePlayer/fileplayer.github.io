"use strict";

(function() {

$.extend( document, {
	fullscreen: function( elem ) {
		elem.requestFullscreen =
			elem      .requestFullscreen ||
			elem    .msRequestFullscreen ||
			elem   .mozRequestFullScreen ||
			elem.webkitRequestFullscreen ||
			$.noop
		;
		elem.requestFullscreen();
	},
	exitFullscreen:
		document.        exitFullscreen ||
		document.      msExitFullscreen ||
		document.   mozCancelFullScreen ||
		document.webkitCancelFullScreen ||
		$.noop
	,
	toggleFullscreen: function( elem, b ) {
		if ( arguments.length === 1 ) {
			b = !document.isFullscreen();
		}
		b
			? document.fullscreen( elem )
			: document.exitFullscreen()
		;
	},
	isFullscreen: function() {
		return (
			document.fullScreen ||
			document.mozFullScreen ||
			document.webkitIsFullScreen ||
			document.msFullscreenElement != null ||
			false
		);
	}
});

})();
