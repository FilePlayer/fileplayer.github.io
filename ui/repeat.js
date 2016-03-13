"use strict";

ui.repeat = function( m ) {
	var dot = "<i class='repeatDot fa fa-circle'></i>";

	dom.playlistRepeatBtn
		.removeClass( "disable one all" )
		.addClass(
			m === true ? "" :
			m === "loopOne" ? "one" :
			m === "loopAll" ? "all" : "disable"
		)
		.attr( "data-tooltip-content",
			"Playing mode&nbsp;:<br/><br/>" +
			( m === false ? dot : "" ) + "&nbsp;&nbsp;stop after file<br/>" +
			( m === true  ? dot : "" ) + "&nbsp;&nbsp;stop after playlist<br/>" +
			( m === "loopOne" ? dot : "" ) + "&nbsp;&nbsp;repeat one<br/>" +
			( m === "loopAll" ? dot : "" ) + "&nbsp;&nbsp;repeat playlist<br/>"
		)
	;
	return ui;
};
