(function() {

var
	jqTitleFile = $( "#title-file" )
;

$( document.body )
	.on( "dragover", false )
	.on( "drop", function( e ) {
		e = e.originalEvent;

		var
			// Save file's informations
			dropFile = e.dataTransfer.files[ 0 ],
			// Create a temporary fake absolute path to the dropped file
			dropFileUrl = URL.createObjectURL( dropFile )
		;

		// Check type file, eg : "video/mp4" -> "video"
		switch ( dropFile.type.substr( 0, dropFile.type.indexOf( "/" ) ) ) {

			case "video" :
				playerAPI.videoElement.src = dropFileUrl;
				playerAPI.play( true );
			break;

			default :
				switch ( dropFile.name.substr( dropFile.name.lastIndexOf( "." ) + 1 ) ) {

					case "vtt" :
						playerAPI.addSubtitles( dropFileUrl );
					break;
				}
		}

		// Show the title's file on the screen
		jqTitleFile
			.text( dropFile.name )
			.addClass( "visible" )
		;
		setTimeout( function() {
			jqTitleFile.removeClass( "visible" );
		}, 2000 );

		return false;
	})
;

})();
