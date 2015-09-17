(function() {

var
	jqTitleFile = $( "#titleFile" )
;

$.extend( playerAPI, {
	addFile: function( file ) {

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

		return this;
	}
});

})();
