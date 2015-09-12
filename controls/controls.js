(function() {

var
	timeoutId,
	jqBody = playerAPI.jqBody
;

$.extend( playerAPI, {
	jqControls: $( "#ctrl" )
});

function showCtrl() {
	clearTimeout( timeoutId );
	jqBody.removeClass( "ctrlHiding ctrlHidden" );
}

function hideCtrl() {
	jqBody.addClass( "ctrlHiding" );
	timeoutId = setTimeout( function() {
		jqBody.addClass( "ctrlHidden" );
	}, 2000 );
}

// Never hide the controls when the mouse is on it.
playerAPI.jqControls.mouseenter( showCtrl );

// Start hiding the controls just after the mouse leave the window.
playerAPI.jqDocument.mouseleave( hideCtrl );

playerAPI.jqVideoElement
	.mousemove( function() {
		// Show the controls when the mouse move.
		// The controls will hide again after the mouse stop moving.
		showCtrl();
		timeoutId = setTimeout( hideCtrl, 500 );
	})
;

})();
