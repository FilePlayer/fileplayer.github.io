"use strict";

ui.updimCanvas = function() {
	var
		c2 = dom.screenCanvas2d[ 0 ],
		c3 = dom.screenCanvasWebgl[ 0 ]
	;
	c2.width  = c3.width  = ui.pxScreenWidth;
	c2.height = c3.height = ui.pxScreenHeight;
	return ui;
};
