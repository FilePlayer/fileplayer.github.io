"use strict";

(function() {

var
	timeoutHiding,
	timeoutHidden
;

function showCtrl() {
	clearTimeout( timeoutHiding );
	clearTimeout( timeoutHidden );
	dom.fileplayer
		.removeClass( "ctrlHiding ctrlHidden" )
		.addClass( "ctrlVisible" )
	;
}

function hideCtrl() {
	clearTimeout( timeoutHiding );
	dom.fileplayer.addClass( "ctrlHiding" );
	timeoutHidden = setTimeout( function() {
		dom.fileplayer
			.removeClass( "ctrlVisible" )
			.addClass( "ctrlHidden" )
		;
	}, 2000 );
}

dom.fileplayer
	// Start hiding the controls just after the mouse leave the window.
	.mouseleave( hideCtrl )

	// Never hide the controls when the mouse is on it.
	.add( dom.ctrl )
		.mouseenter( showCtrl )
;

// Show the controls when the mouse move.
// The controls will hide again after the mouse stop moving.
dom.screenVideo.mousemove( function() {
	showCtrl();
	timeoutHiding = setTimeout( hideCtrl, 500 );
});

})();
