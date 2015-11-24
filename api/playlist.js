(function() {

var
	that,
	currId = false
;

api.playlist = that = {
	files: [],
	push: function( file ) {
		if ( file instanceof Blob ) {
			api.playlist.files.push({
				"file" : file,
				"url"  : URL.createObjectURL( file )
			});
			currId = api.playlist.files.length - 1;
			playlistUI.addFile( file.name );
			api.video
				.load( currId )
				.play()
		}
		return that;
	}
};

})();
