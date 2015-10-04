(function() {

$.extend( playerAPI, {
	getSource: function() {
		return this.videoElement.getAttribute( "src" );
	},
	setSource: function( src ) {
		this.videoThumbnail.setAttribute( "src", src );
		this.videoElement.setAttribute( "src", src );
		return this;
	},
	addFile: function( file ) {
		var
			name = file.name,
			extension = name.substr( name.lastIndexOf( "." ) + 1 )
		;

		switch ( extension.toLowerCase() ) {
			case "vtt" :
			case "srt" :
				this.createSubtitles( file );
			break;

			case "mp4" :
				this
					.setSource( URL.createObjectURL( file ) )
					.play( true )
				;
			break;

			default :
			return this;
		}

		return this.showTitle( name );
	}
});

})();
