"use strict";

(function() {

var timeoutId;

$.extend( ui, {
	fileDetach: function( jqFile ) {
		if ( jqFile ) {
			jqFile.addClass( "dragging" );
			// callback to the end of the CSS's animation.
			timeoutId = setTimeout( function() {
				jqFile.detach();
				ui.listUpdate();
			}, 200 );
		}
		return ui;
	},
	fileReattach: function( jqFile ) {
		clearTimeout( timeoutId );
		ui.listAdd( jqFile );
		setTimeout( function() {
			jqFile.removeClass( "dragging" );
		}, 1 );
		return ui;
	}
});

})();
