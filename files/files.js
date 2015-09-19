(function() {

var
	jqTitleFile = $( "#titleFile" )
;

$.extend( playerAPI, {
	addFile: function( file ) {
		var
			name = file.name,
			extension = name.substr( name.lastIndexOf( "." ) + 1 )
		;

		switch ( extension.toLowerCase() ) {
			case "vtt" :
			case "srt" :
				playerAPI.createSubtitles( file );
			break;

			case "mp4" :
				playerAPI.videoElement.src = URL.createObjectURL( file );
				playerAPI.play( true );
			break;
		}

		// Show the title's file on the screen
		jqTitleFile
			.text( name )
			.addClass( "visible" )
		;
		setTimeout( function() {
			jqTitleFile.removeClass( "visible" );
		}, 2000 );

		return this;
	}
});

})();
