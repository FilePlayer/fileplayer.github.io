"use strict";

$.extend( ui, {
	listAdd: function( filesWrapper ) {
		var
			html = "",
			jqFiles = filesWrapper
		;

		if ( !filesWrapper.jquery ) {
			$.each( filesWrapper, function() {
				html +=
					"<a class='file' href='/' draggable='true'>" +
						"<div class='content textOverflow'>"+
							"<span class='filename' data-type='" +
								this.mediaType + "'>" + this.name + "</span>" +
						"</div>" +
					"</a>"
				;
			});
			jqFiles = $( html )
				.click( false )
				.dblclick( function() {
					api.playlist.select( this, "noscroll" );
					return false;
				})
				.each( function( i ) {
					filesWrapper[ i ].element = this;
					this.fileWrapper = filesWrapper[ i ];
					this.jqThis = $( this );
				})
			;
		}

		if ( ui.jqDragover === dom.playlistList ) {
			jqFiles.appendTo( dom.playlistList );
		} else if ( ui.jqDragover ) {
			jqFiles.insertBefore( ui.jqDragover );
		}
		ui
			.listDragOver( null )
			.listUpdate()
		;
		return jqFiles;
	}
});
