"use strict";

ui.updimCanvas = function() {
	var canvas = dom.screenCanvas[ 0 ];
	canvas.width = ui.pxScreenWidth;
	canvas.height = ui.pxScreenHeight;
	return ui;
};
