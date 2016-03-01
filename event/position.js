"use strict";

(function() {

// Change the currentTime by using the long slider.
dom.ctrlInputRangePosition.change( function() {
	if ( !api.video.isStopped ) {
		api.video.currentTime( this.value );
	}
});

// Switch between showing the duration or the remaining time.
dom.ctrlTimeText.click( function() {
	dom.ctrlTimeText.toggleClass( "remaining" );
});

function pos( p ) {
	if ( !api.video.isStopped ) {
		api.video.currentTime( p );
		var sec = api.video.currentTime();
		ui
			.currentTime( sec )
			.actionDesc(
				utils.secondsToString( sec ) + " / " +
				utils.secondsToString( api.video.duration() )
			)
		;
	}
}

// Control the position with the arrow keys.
api.keyboard
	.shortcut( "left",        pos.bind( null,  "-=1" ) )
	.shortcut( "right",       pos.bind( null,  "+=1" ) )
	.shortcut( "shift+left",  pos.bind( null,  "-=3" ) )
	.shortcut( "shift+right", pos.bind( null,  "+=3" ) )
	.shortcut( "alt+left",    pos.bind( null, "-=10" ) )
	.shortcut( "alt+right",   pos.bind( null, "+=10" ) )
	.shortcut( "ctrl+left",   pos.bind( null, "-=60" ) )
	.shortcut( "ctrl+right",  pos.bind( null, "+=60" ) )
;

})();
