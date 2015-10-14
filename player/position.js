(function() {

var
	elVideo = dom.jqPlayerVideo[ 0 ],
	jqTxtPosition = dom.jqPlayerTimeText
;

dom.jqPlayerSliderCurrentTime.change( function() {
	if ( elVideo.duration ) {
		var val = this.value * elVideo.duration;
		playerUI.currentTime( val );
		api.video.currentTime( val );
	}
});

// Switch between showing the duration or the remaining time.
jqTxtPosition.click( function() {
	jqTxtPosition.toggleClass( "remaining" );
});

function pos( p ) {
	api.video.currentTime( p );
	var sec = api.video.currentTime();
	playerUI.actionDesc(
		utils.secondsToString( sec ) + " / " +
		utils.secondsToString( api.video.duration() )
	);
	playerUI.currentTime( sec );
}

// Control the position with the arrow keys.
api.keyboard
	.shortcut( "shift+left",  pos.bind( null,  "-=3" ) )
	.shortcut( "shift+right", pos.bind( null,  "+=3" ) )
	.shortcut( "alt+left",    pos.bind( null, "-=10" ) )
	.shortcut( "alt+right",   pos.bind( null, "+=10" ) )
	.shortcut( "ctrl+left",   pos.bind( null, "-=60" ) )
	.shortcut( "ctrl+right",  pos.bind( null, "+=60" ) )
;

})();
