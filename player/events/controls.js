(function() {

var
	timeoutHiding,
	timeoutHidden,
	jqPlayer = dom.jqPlayer
;

function showCtrl() {
	clearTimeout( timeoutHiding );
	clearTimeout( timeoutHidden );
	jqPlayer.removeClass( "ctrlHiding ctrlHidden" );
}

function hideCtrl() {
	clearTimeout( timeoutHiding );
	jqPlayer.addClass( "ctrlHiding" );
	timeoutHidden = setTimeout( function() {
		jqPlayer.addClass( "ctrlHidden" );
	}, 2000 );
}

dom.jqPlayer
	// Start hiding the controls just after the mouse leave the window.
	.mouseleave( hideCtrl )

	// Never hide the controls when the mouse is on it.
	.add( dom.jqPlayerCtrl )
		.mouseenter( showCtrl )
;

// Show the controls when the mouse move.
// The controls will hide again after the mouse stop moving.
dom.jqPlayerVideo.mousemove( function() {
	showCtrl();
	timeoutHiding = setTimeout( hideCtrl, 500 );
});

})();
