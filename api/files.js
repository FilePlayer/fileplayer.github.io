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

			default :
				api.playlist.push( file )
				api.video
					.load( api.playlist.files[ api.playlist.currId ].url )
					.play()
			break;
		}

		playerUI.title( name );
		return that;
	}
};

})();
