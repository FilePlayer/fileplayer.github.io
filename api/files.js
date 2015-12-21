(function() {

var
	that
;

api.files = that = {
	add: function( file ) {
		var
			name = file.name,
			ind = name.lastIndexOf( "." ),
			fileWrapper = {
				file: file,
				name: name.substr( 0, ind ),
				extension: name.substr( ind + 1 ).toLowerCase()
			}
		;

		switch ( file.type ) {
			case "video/webm" :
			case "audio/webm" :
			case "video/mp4" :
			case "audio/mp3" :
			case "video/ogg" :
			case "audio/ogg" :
			case "application/ogg" :
			case "audio/wave" :
			case "audio/wav" :
			case "audio/x-wav" :
			case "audio/x-pn-wav" :
				api.playlist.pushAndPlay( fileWrapper );
			break;

			default :
				switch ( fileWrapper.extension ) {
					case "srt" :
					case "vtt" :
						api.subtitles.newTrack( fileWrapper );
					break;
					default :
						// Abort
						return that;
				}
		}

		playerUI.title( name );
		return that;
	}
};

})();
