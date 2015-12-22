(function() {

var
	that
;

api.files = that = {
	add: function( files ) {
		var
			filesWrappers = []
		;

		$.each( files, function() {
			var
				name = this.name,
				ind = name.lastIndexOf( "." ),
				fileWrapper = {
					file: this,
					name: name.substr( 0, ind ),
					extension: name.substr( ind + 1 ).toLowerCase()
				},
				debug = "[" + this.type + "] [" + fileWrapper.extension + "]"
			;

			switch ( fileWrapper.extension ) {
				case "mp3" :
				case "mp4" :
				case "mpeg" :
				case "mpg" :
				case "ogg" :
				case "ogm" : // ?
				case "wav" :
				case "weba" : // ?
				case "webm" :
					filesWrappers.push( fileWrapper );
				break;

				case "srt" :
				case "vtt" :
					api.subtitles.newTrack( fileWrapper );
				break;

				default :
					// Continue;
					lg( "DROP: not supported: " + debug );
					return;
			}

			lg( "DROP: supported: " + debug );
		});

		api.playlist.pushAndPlay( filesWrappers );
		return that;
	}
};

})();
