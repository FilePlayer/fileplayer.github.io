"use strict";

(function() {

var
	extText = "srt-vtt",
	extMedia = "mp3-mp4-mpeg-ogg-wav-webm-mpg-weba-ogm"
;

api.file = function( file ) {
	var
		name = file.name,
		ind = name.lastIndexOf( "." ),
		ext = name.substr( ind + 1 ).toLowerCase()
	;

	this.dataFile = file;
	this.name = name.substr( 0, ind ),
	this.extension = ext;
	this.isText = extText.indexOf( ext ) > -1;
	this.isMedia = extMedia.indexOf( ext ) > -1;
	this.mediaType = file.type.substr( 0, file.type.indexOf( "/" ) );7
};

api.file.prototype = {
	createURL: function() {
		this.url = URL.createObjectURL( this.dataFile );
		return this;
	},
	revokeURL: function() {
		URL.revokeObjectURL( this.url );
		return this;
	}
};

})();
