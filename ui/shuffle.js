"use strict";

$.extend( ui, {
	shuffle: function( b ) {
		dom.playlistShuffleBtn
			.toggleClass( "enable", b )
			.attr(
				"data-tooltip-content",
				"Shuffle " + "<i class='fa fa-toggle-" + ( b ? "on" : "off" ) + "'></i>"
			)
		;
		return ui;
	}
});
