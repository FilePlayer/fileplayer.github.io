(function() {

var
	elDoc = document.documentElement,
	controls = window.player.controls,
	jqDocument = $( document ),
	jqBtnFScr = $( "#ctrl .btn.fullscreen" )
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

$.extend( controls, {
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

jqBtnFScr.click( function() {
	controls.fullscreenToggle();
	return false;
});

jqDocument
	.keydown( function( e ) {
		if ( e.keyCode === 122 ) { // 122: F11
			controls.fullscreenToggle();
			return false;
		}
	})
	.on( "fullscreenchange mozfullscreenchange webkitfullscreenchange", function() {
		jqBtnFScr
			.removeClass( "fa-expand fa-compress" )
			.addClass(
				controls.fullscreen()
					? "fa-compress"
					: "fa-expand"
			)
		;
	})
;

})();
