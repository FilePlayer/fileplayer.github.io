"use strict";

(function() {

dom.ctrl360Btn.click( ui.video360Toggle );

var dragging;

dom.screenCanvasWebgl.mousedown( function( e ) {
	if ( e.button === 0 ) {
		dragging = true;
		dom.body.addClass( "cursor-move no-select" );
	}
});

dom.body
	.mouseup( function( e ) {
		if ( e.button === 0 ) {
			dragging = false;
			dom.body.removeClass( "cursor-move no-select" );
		}
	})
	.mousemove( function( e ) {
		if ( dragging ) {
			ui.video360Mousemove(
				e.originalEvent.movementX,
				e.originalEvent.movementY
			);
		}
	})
;

})();
