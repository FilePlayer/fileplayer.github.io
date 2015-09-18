(function() {

var
	jqTitleFile = $( "#titleFile" )
;

$.extend( playerAPI, {
	addFile: function( file ) {
		// Create a temporary fake absolute path to the dropped file
		file.url = URL.createObjectURL( file );

		switch ( file.type ) {
			case "video/mp4" :
				playerAPI.playlist.content.unshift( file );
				playerAPI.videoElement.src = playerAPI.playlist.content[playerAPI.playlist.curr].url;
				playerAPI.play( true );
			break;

			case "text/subtitles" :
				playerAPI.addSubtitles( file );
			break;
		}

		// Show the title's file on the screen
		jqTitleFile
			.empty()
			.text( file.name )
			.addClass( "visible" )
		;
		setTimeout( function() {
			jqTitleFile.removeClass( "visible" );
		}, 2000 );

		return this;
	},
	checkExtension: function( file ) {
		var
			blob,
			name = file.name,
			extension = name.substr( name.lastIndexOf( "." ) + 1 )
		;

		switch ( extension.toLowerCase() ) {
			// Handle subtitles files
			case "vtt" :
			case "srt" :
				// Create a new Instance for each dropped subtitles
				var	reader = new FileReader();

				reader.onloadend = function () {
					blob = new Blob(
						[ playerAPI.encodeToWebVTT( reader.result ) ],
						{
							type: "text/subtitles",
							endings: "transparent",
						}
					);
					blob.name = name;
					playerAPI.addFile( blob );
				}
				reader.readAsText( file );
			break;

			// Handles all others files
			default :
				playerAPI.addFile( file );
		}
		return this;
	}
});

})();
