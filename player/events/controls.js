(function() {

var
	timeoutId,
	jqPlayer = dom.jqPlayer
;

function showCtrl() {
	clearTimeout( timeoutId );
	jqPlayer.removeClass( "ctrlHiding ctrlHidden" );
}

function hideCtrl() {
	jqPlayer.addClass( "ctrlHiding" );
	timeoutId = setTimeout( function() {
		jqPlayer.addClass( "ctrlHidden" );
	}, 2000 );
}

// Never hide the controls when the mouse is on it.
dom.jqPlayerCtrl.mouseenter( showCtrl );

// Start hiding the controls just after the mouse leave the window.
dom.jqDoc.mouseleave( hideCtrl );

// Show the controls when the mouse move.
// The controls will hide again after the mouse stop moving.
dom.jqPlayerVideo.mousemove( function() {
	showCtrl();
	timeoutId = setTimeout( hideCtrl, 500 );
});

})();
