(function() {

var that;

api.playlist = that = {
	files: [],
	currId: false,
	push: function( file ) {
		if ( file instanceof Blob ) {
			api.playlist.files.push({
				"file" : file,
				"url"  : URL.createObjectURL( file )
			});
			api.playlist.currId = api.playlist.files.length - 1;
			playlistUI.push( file.name );
			api.video
				.load( api.playlist.files[ api.playlist.currId ].url )
				.play()
		}
		return that;
	}
};

})();
