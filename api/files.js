(function() {

var
	that,
	jqPlaylistContent = dom.jqPlaylistContent
;

api.files = that = {
	add: function( file ) {
		var
			name = file.name,
			extension = name.substr( name.lastIndexOf( "." ) + 1 ),
			plIndex = jqPlaylistContent.children().length
		;

		switch ( extension.toLowerCase() ) {
			case "vtt" :
			case "srt" :
				api.subtitles.newTrack( file );
			break;

			default :
				api.playlist.push( file );
				api.video
					.load( api.playlist.files[ plIndex ].url )
					.play()
				;
				api.playlist.currentIndex( plIndex + 1 );
			break;
		}

		playerUI.title( name );
		return that;
	}
};

})();
