"use strict";

(function() {

var
	timeoutHiding,
	timeoutHidden
;

ui.showCtrl = function() {
	clearTimeout( timeoutHiding );
	clearTimeout( timeoutHidden );
	dom.fileplayer
		.removeClass( "ctrlHiding ctrlHidden" )
		.addClass( "ctrlVisible" )
	;
	return ui;
};

ui.hideCtrl = function() {
	var clazz = dom.fileplayer[ 0 ].className;
	clearTimeout( timeoutHiding );
	if ( clazz.indexOf( "list-open" ) < 0 ) {
		dom.fileplayer.addClass( "ctrlHiding" );
		timeoutHidden = setTimeout( function() {
			dom.fileplayer
				.removeClass( "ctrlVisible" )
				.addClass( "ctrlHidden" )
			;
		}, 2000 );
	}
	return ui;
}

dom.fileplayer
	// Start hiding the controls just after the mouse leave the window.
	.mouseleave( ui.hideCtrl )

	// Never hide the controls when the mouse is on it.
	.add( dom.ctrl )
		.mouseenter( ui.showCtrl )
;

// Show the controls when the mouse move.
// The controls will hide again after the mouse stop moving.
dom.screen.mousemove( function() {
	ui.showCtrl();
	timeoutHiding = setTimeout( ui.hideCtrl, 500 );
});

})();
