"use strict";

ui.updimFilename = function() {
	dom.screenFilename.css(
		"width", ui.listIsOpen
		? 100 - ui.percListWidth + "%"
		: "100%"
	);
	return ui;
};
