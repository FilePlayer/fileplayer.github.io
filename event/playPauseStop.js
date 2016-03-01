"use strict";

dom.ctrlStopBtn.click( api.video.stop );
dom.ctrlPlayBtn.click( api.video.playToggle );

api.keyboard
	.shortcut( "s", api.video.stop )
	.shortcut( " ", api.video.playToggle )
;
