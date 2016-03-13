"use strict";

ui.play = function() {
	dom.ctrlPlayBtn
		.removeClass( "fa-play" )
		.addClass( "fa-pause" )
	;
	return ui.actionDesc( "Play" );
};

ui.pause = function() {
	dom.ctrlPlayBtn
		.removeClass( "fa-pause" )
		.addClass( "fa-play" )
	;
	return ui.actionDesc( "Pause" );
};
