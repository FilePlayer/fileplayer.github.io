(function() {

var that;

api.playlist = that = {
	files: [],
	currId: false,
	push: function( file ) {
		if ( file instanceof Blob ) {
			that.files.push({
				"file" : file,
				"url"  : URL.createObjectURL( file )
			});
			that.currId = that.files.length - 1;
			playlistUI.push( file.name );
		}
		return that;
	}
};

})();
