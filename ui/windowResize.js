"use strict";

ui.windowResize = function() {

	// Be careful with changing this order:
	return ui
		.updimScreen()
		.updimVideo()
		.updimList()
		.updimFilename()
		.updimCanvas()
		.updimSubtitles()
	;
};
