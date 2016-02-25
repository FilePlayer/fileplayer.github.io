"use strict";

$.extend( ui, {
	play: function() {
		dom.ctrlPlayBtn
			.removeClass( "fa-play" )
			.addClass( "fa-pause" )
		;
		return ui.actionDesc( "Play" );
	},
	pause: function() {
		dom.ctrlPlayBtn
			.removeClass( "fa-pause" )
			.addClass( "fa-play" )
		;
		return ui.actionDesc( "Pause" );
	}
});
