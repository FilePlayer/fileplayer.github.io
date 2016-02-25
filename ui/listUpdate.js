"use strict";

$.extend( ui, {
	jqFiles: dom.empty,
	listUpdate: function() {
		ui.jqFiles = dom.playlistList.children();
		return ui;
	},
	indexFile: function() {
		dom.playlistNavIndex.text( 1 + ui.jqFiles.index( ui.jqFileSelected ) );
		return ui;
	},
	totalFiles: function() {
		dom.playlistNavTotal.text( ui.jqFiles.length );
		return ui;
	}
});
