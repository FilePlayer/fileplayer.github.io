(function() {

var
	jqTitleFile = $( "#title-file" )
	// New instance to read the blob's content
	reader = new FileReader()
;

function treatFile( file ) {
	// Create a temporary fake absolute path to the dropped file
	var url = URL.createObjectURL( file );

	switch ( file.type ) {
		case "video/mp4" :
			playerAPI.videoElement.src = url;
			playerAPI.play( true );
		break;

		case "text/subtitles" :
			playerAPI.addSubtitles( url );
		break;
	}

	// Show the title's file on the screen
	jqTitleFile
		.text( file.name )
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

		var
			blob,
			file = e.dataTransfer.files[ 0 ],
			name = file.name,
			extension = name.substr( name.lastIndexOf( "." ) + 1 )
		;

		switch ( extension.toLowerCase() ) {
			// Handle subtitles files
			case "vtt" :
			case "srt" :
				reader.onloadend = function () {
					blob = new Blob(
						[ encodeToWebVTT( reader.result ) ],
						{
							type: "text/subtitles",
							endings: "transparent",
						}
					);
					blob.name = name;
					treatFile( blob );
				}
				reader.readAsText( file );
			break;

			// Handles all others files
			default :
				treatFile( file );
		}

		return false;
	})
;

})();
