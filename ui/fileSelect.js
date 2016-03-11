"use strict";

$.extend( ui, {
	jqFileSelected: dom.empty,
	fileSelect: function( jqFile ) {
		var fwrap = jqFile[ 0 ].fileWrapper;

		function txt( btn, file, str ) {
			file = file && file.fileWrapper;
			btn[ 0 ].dataset.tooltipContent = !file ? "" :
				str + "&nbsp;: <span class='filename' data-type='" +
				file.type + "'>" + file.name + "</span>"
			;
		}

		// Write the tooltip on the prev/next buttons.
		txt( dom.ctrlPrevBtn, jqFile.prev()[ 0 ] || ui.jqFiles.get( -1 ), "Previous" );
		txt( dom.ctrlNextBtn, jqFile.next()[ 0 ] || ui.jqFiles[ 0 ], "Next" );

		// toggleClass "selected" on the jqFile in the playlist's list.
		ui.jqFileSelected.removeClass( "selected" );
		ui.jqFileSelected = jqFile.addClass( "selected" );

		// Display or not the canvas.
		ui.canvasToggle( fwrap.type === "audio" && api.visualisations.enable );
		return ui;
	}
});
