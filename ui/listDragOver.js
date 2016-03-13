"use strict";

ui.jqDragover = dom.playlistList;

ui.listDragOver = function( jqElem ) {
	if ( jqElem !== ui.jqDragover ) {
		if ( ui.jqDragover ) {
			ui.jqDragover.removeClass( "dragover" );
		}
		if ( jqElem === dom.screen ) {
			var
				jq,
				sel = api.playlist.selectedFile()
			;
			if ( sel ) {
				sel = sel.element.jqThis.next();
				if ( sel.length ) {
					jq = sel[ 0 ].jqThis;
				}
			}
			jqElem = jq || dom.playlistList;
		}
		ui.jqDragover = jqElem;
		if ( jqElem ) {
			jqElem.addClass( "dragover" );
		}
	}
	return ui;
};
