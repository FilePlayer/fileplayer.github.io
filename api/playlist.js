(function() {

var
	that,
	currId = false
;

api.playlist = that = {
	items: [],
	addItem: function( file ) {
		if ( file instanceof Blob ) {
			api.playlist.items.push( file );
			currId = api.playlist.items.length - 1;
			playlistUI.addItem( file.name );
			api.playlist.load( currId );
		}
		return that;
	},
	load: function( id ) {
		api.video
			.load( URL.createObjectURL( api.playlist.items[ id ] ) )
			.play()
		;
		return that;
	}
};

})();
