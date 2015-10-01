(function() {

$.extend( playerAPI, {
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
				this.videoThumbnail.src =
				this.videoElement.src = URL.createObjectURL( file );
				this.play( true );
			break;

			default :
			return this;
		}

		return this.showTitle( name );
	}
});

})();
