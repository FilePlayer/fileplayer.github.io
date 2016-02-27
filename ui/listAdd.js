"use strict";

$.extend( ui, {
	listAdd: function( filesWrapper ) {
		var
			jqFiles = filesWrapper,
			html = "",
			icon
		;

		if ( !filesWrapper.jquery ) {
			$.each( filesWrapper, function() {
				icon = this.mediaType === "audio" ? "music" : "film";
				html +=
					"<a class='file' href='/' draggable='true'>" +
						"<div class='content textOverflow'>"+
							"<i class='fa fa-fw fa-" +
								( this.isSupported ? icon : "times" ) +
							"'></i>" +
							"<span>" + this.name + "</span>" +
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
