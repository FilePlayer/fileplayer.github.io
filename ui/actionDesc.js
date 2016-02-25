"use strict";

(function() {

var screenTextTimeoutId;

$.extend( ui, {
	actionDescEnable: true,
	actionDesc: function( msg ) {
		if ( ui.actionDescEnable ) {
			clearTimeout( screenTextTimeoutId );
			dom.screenShortcutText
				.text( msg )
				.removeClass( "hidden" )
			;
			// Start to fadeout the element after 2s.
			screenTextTimeoutId = setTimeout( function() {
				dom.screenShortcutText.addClass( "hidden" );
			}, 2000 );
		}
		return ui;
	}
});

})();
