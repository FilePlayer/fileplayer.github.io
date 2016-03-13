"use strict";

ui.jqFiles = dom.empty;

ui.listUpdate = function() {
	ui.jqFiles = dom.playlistList.children();
	return ui;
};

ui.indexFile = function() {
	dom.playlistNavIndex.text( 1 + ui.jqFiles.index( ui.jqFileSelected ) );
	return ui;
};

ui.totalFiles = function() {
	dom.playlistNavTotal.text( ui.jqFiles.length );
	return ui;
};
