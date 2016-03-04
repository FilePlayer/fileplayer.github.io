"use strict";

ui.updimVideo = function() {
	var
		r = api.imageRatio,
		w = ui.pxScreenWidth,
		h = ui.pxScreenHeight
	;
	ui.pxVideoWidth  = r > ui.screenRatio ? w : h * r;
	ui.pxVideoHeight = r < ui.screenRatio ? h : w / r;
	return ui;
};
