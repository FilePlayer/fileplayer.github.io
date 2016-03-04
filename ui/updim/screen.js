"use strict";

ui.updimScreen = function() {
	var
		w = dom.screenVideo.width(),
		h = dom.screenVideo.height()
	;
	ui.pxScreenWidth = w;
	ui.pxScreenHeight = h;
	ui.screenRatio = w / h;
	return ui;
};
