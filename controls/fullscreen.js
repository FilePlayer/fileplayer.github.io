(function() {

var
	elDoc = document.documentElement,
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

jqBtnFScr.click( function() {
	playerAPI.fullscreenToggle();
	return false;
});

jqDocument
	.keydown( function( e ) {
		if ( e.keyCode === 122 ) { // 122: F11
			playerAPI.fullscreenToggle();
			return false;
		}
	})
	.on( "fullscreenchange mozfullscreenchange webkitfullscreenchange", function() {
		jqBtnFScr
			.removeClass( "fa-expand fa-compress" )
			.addClass(
				playerAPI.fullscreen()
					? "fa-compress"
					: "fa-expand"
			)
		;
	})
;

})();
