(function() {

var that;

api.playlist = that = {
	files: [],
	currId: false,
	push: function( file ) {
		if ( file instanceof Blob ) {
			this.files.push({
				"file" : file,
				"url"  : URL.createObjectURL( file )
			});
			this.currId = this.files.length - 1;
			playlistUI.push( file.name );
		}
		return that;
	}
};

})();
