"use strict";

(function() {

var
	extText = "srt-vtt",
	extMedia = "mp3-mp4-mpeg-ogg-wav-webm-mpg-weba-ogm",
	extAudio = "mp3-ogg-wav-weba"
;

api.file = function( file ) {
	var
		indA,
		indB,
		ext,
		path = file.name || file.url
	;

	this.isLocal = !!file.name;

	// Name.
	indA = path.lastIndexOf( "/" );
	indB = path.lastIndexOf( "." );
	this.name = path.substr(
		indA + 1,
		indB >= 0
			? indB - indA - 1
			: undefined
	);

	// Extension / type.
	if ( indB >= 0 ) {
		this.extension = ext = path.substr( indB + 1 ).toLowerCase();
	}
	this.isText = extText.indexOf( ext ) > -1;
	this.isMedia = extMedia.indexOf( ext ) > -1;
	this.isSupported = this.isText || this.isMedia;
	if ( this.isSupported ) {
		this.mediaType = extAudio.indexOf( ext ) > -1 ? "audio" : "video";
	}

	if ( this.isLocal ) {
		this.dataFile = file;
	} else {
		this.url = path;
		this.cors = file.cors;
	}
};

api.file.prototype = {
	createURL: function() {
		if ( this.isLocal ) {
			this.url = URL.createObjectURL( this.dataFile );
		}
		return this;
	},
	revokeURL: function() {
		if ( this.isLocal ) {
			URL.revokeObjectURL( this.url );
		}
		return this;
	}
};

})();
