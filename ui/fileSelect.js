"use strict";

$.extend( ui, {
	jqFileSelected: dom.empty,
	fileSelect: function( jqFile ) {
		ui.jqFileSelected.removeClass( "selected" );
		ui.jqFileSelected = jqFile.addClass( "selected" );

		txt( dom.ctrlPrevBtn, jqFile.prev()[ 0 ] || ui.jqFiles.get( -1 ), "Previous" );
		txt( dom.ctrlNextBtn, jqFile.next()[ 0 ] || ui.jqFiles[ 0 ], "Next" );
		function txt( btn, file, str ) {
			var icon;
			if ( file = file && file.fileWrapper ) {
				icon = file.mediaType === "audio" ? "music" : "film";
				btn[ 0 ].dataset.tooltipContent =
					str + "&nbsp;: <i class='fa fa-" +
						( file.isSupported ? icon : "times" ) +
					"'></i> " + file.name
				;
			}
		}
		return ui;
	}
});
