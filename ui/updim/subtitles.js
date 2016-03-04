"use strict";

ui.updimSubtitles = function() {
	var btm = ( ui.pxScreenHeight - ui.pxVideoHeight ) / 2;
	dom.screenCueWrapper
		.toggleClass( "isUnderCtrl", btm < 80 ) // 80: dom.ctrl.outerHeight()
		.css( {
			bottom: btm,
			fontSize: Math.max( 10, ui.pxVideoWidth / 100 * 2.5 ) + "px"
		})
	;
	return ui;
};
