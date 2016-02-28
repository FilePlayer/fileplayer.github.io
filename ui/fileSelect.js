"use strict";

$.extend( ui, {
	jqFileSelected: dom.empty,
	fileSelect: function( jqFile ) {
		ui.jqFileSelected.removeClass( "selected" );
		ui.jqFileSelected = jqFile.addClass( "selected" );

		function txt( btn, file, str ) {
			file = file && file.fileWrapper;
			btn[ 0 ].dataset.tooltipContent = !file ? "" :
				str + "&nbsp;: <span class='filename' data-type='" +
				file.mediaType + "'>" + file.name + "</span>"
			;
		}

		txt( dom.ctrlPrevBtn, jqFile.prev()[ 0 ] || ui.jqFiles.get( -1 ), "Previous" );
		txt( dom.ctrlNextBtn, jqFile.next()[ 0 ] || ui.jqFiles[ 0 ], "Next" );
		return ui;
	}
});
