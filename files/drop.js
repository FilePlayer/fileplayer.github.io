(function() {

var
	jqTitleFile = $( "#title-file" )
	// New instance to read the blob's content
	reader = new FileReader()
;

function treatFile( dropFile ) {
	// Create a temporary fake absolute path to the dropped file
	var dropFileUrl = URL.createObjectURL( dropFile );

	switch ( dropFile.type ) {
		case "video/mp4" :
			playerAPI.videoElement.src = dropFileUrl;
			playerAPI.play( true );
		break;

		case "text/subtitles" :
			playerAPI.addSubtitles( dropFileUrl );
		break;
	}

	// Show the title's file on the screen
	jqTitleFile
		.text( dropFile.name )
		.addClass( "visible" )
	;
	setTimeout( function() {
		jqTitleFile.removeClass( "visible" );
	}, 2000 );
}

function encodeToWebVTT( fileContent ) {
	return (
		"WEBVTT\n\n" +
			fileContent
				// Delete special encoded characters then make VTT coding style
				.substr( fileContent.indexOf( "1" ) )
				// Replace "," in SRT files by "." in VTT files
				.replace( /(\d{2}),(\d{3})/g, "$1.$2" )
	);
}

$( document.body )
	.on( "dragover", false )
	.on( "drop", function( e ) {
		e = e.originalEvent;

		// Save file's informations
		var dropFile = e.dataTransfer.files[ 0 ];

		switch ( dropFile.name.substr( dropFile.name.lastIndexOf( "." ) + 1 ).toLowerCase() ) {
			// Handle subtitles files
			case "vtt" :
			case "srt" :
				reader.onloadend = function () {
					treatFile(
						new Blob(
							[ encodeToWebVTT( reader.result ) ],
							{ type: "text/subtitles" }
						)
					);
				}
				reader.readAsBinaryString( dropFile );
			break;

			// Handles all files
			default :
				treatFile( dropFile );
		}

		return false;
	})
;

})();
