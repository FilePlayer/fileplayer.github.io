"use strict";

(function() {

var isSeeking = false;

$.extend( ui, {
	seekTimeout: null,
	seeking: function() {
		if ( !isSeeking ) {
			isSeeking = true;
			dom.fileplayer.addClass( "seeking" );
		}
		return ui;
	},
	seeked: function() {
		clearTimeout( ui.seekTimeout );
		if ( isSeeking ) {
			isSeeking = false;
			dom.fileplayer.removeClass( "seeking" );
		}
		return ui;
	}
});

})();
