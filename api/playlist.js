(function() {

var
	that,
	currId = 0
;

api.playlist = that = {
	files: [],
	push: function( file ) {
		if ( file instanceof Blob ) {
			that.files.push({
				"file" : file,
				"url"  : URL.createObjectURL( file )
			});
			playlistUI.push( file.name );
		}
		return that;
	},
	currentIndex: function( id ) {
		if ( !arguments.length ) {
			return currId;
		}
		currId = id;
		return that;
	}
};

})();
