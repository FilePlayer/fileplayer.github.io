(function() {

var
	that
;

api.files = that = {
	add: function( file ) {
		var
			name = file.name,
			extension = name.substr( name.lastIndexOf( "." ) + 1 )
		;

		switch ( extension.toLowerCase() ) {
			case "vtt" :
			case "srt" :
				api.subtitles.newTrack( file );
			break;

			case "mp4" :
				api.video
					.setSource( URL.createObjectURL( file ) )
					.play()
				;
			break;

			default :
			return that;
		}

		playerUI.title( name );
		return that;
	}
};

})();