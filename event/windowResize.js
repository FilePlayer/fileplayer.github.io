"use strict";

dom.window.resize( function() {
	// Be careful with changing this order:
	api.screen.resize();
	ui.listResize();
	api.screen.resizeFilename();
	api.visualisations.resize();
	ui.subtitlesResizeUpdate();
});
