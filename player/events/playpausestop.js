(function() {

dom.jqPlayerStopBtn.click( api.video.stop );
dom.jqPlayerPlayBtn.click( api.video.playToggle );

api.keyboard
	.shortcut( "s", api.video.stop )
	.shortcut( " ", api.video.playToggle )
;

})();
