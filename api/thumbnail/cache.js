(function() {

var
	that,
	cache,
	nbImgCached
;

api.thumbnail.cache = that = {
	init: function( size ) {
		cache = undefined;
		nbImgCached = 0;
		cache = new Array( size );
		return that;
	},
	newImage: function( sec, img ) {
		cache[ sec ] = img;
		++nbImgCached;
		return that;
	},
	getImage: function( sec, tolerance ) {
		var img;
		sec = ~~sec;
		if ( !tolerance ) {
			img = cache[ sec ];
		} else for ( var i = 0; i < tolerance; ++i ) {
			if ( img = cache[ sec - i ] || cache[ sec + i ] ) {
				break;
			}
		}
		return img;
	}
};

})();
