(function() {

var
	timeoutId,
	jqPlayer = playerAPI.jqPlayer
;

$.extend( playerAPI, {
	jqControls: $( "#ctrl" ),
	jqControlsMenu : $(".menu")
});

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
