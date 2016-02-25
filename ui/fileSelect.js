"use strict";

$.extend( ui, {
	jqFileSelected: dom.empty,
	fileSelect: function( jqFile ) {
		ui.jqFileSelected.removeClass( "selected" );
		ui.jqFileSelected = jqFile.addClass( "selected" );

		txt( dom.ctrlPrevBtn, jqFile.prev()[ 0 ] || ui.jqFiles.get( -1 ), "Previous" );
		txt( dom.ctrlNextBtn, jqFile.next()[ 0 ] || ui.jqFiles[ 0 ], "Next" );
		function txt( btn, file, str ) {
			if ( file = file && file.fileWrapper ) {
				btn[ 0 ].dataset.tooltipContent =
					str + "&nbsp;: <i class='fa fa-" +
						( file.mediaType === "audio" ? "music" : "film" ) +
					"'></i> " + file.name
				;
			}
		}
		return ui;
	}
});
