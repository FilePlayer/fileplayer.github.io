"use strict";

(function() {

var
	extAudio = "mp3-ogg-wav-weba",
	extVideo = "mp4-ogm-mpeg-mpg-webm",
	extArray = "mp3-mp4-mpeg-ogg-wav-webm-mpg-weba-ogm-srt-vtt".split( "-" )
;

api.file = function( file ) {
	var
		ind,
		url = file.name || file.url,
		reg = url.match( /([^/?#]*)\.([^./?#]+)/g )
	;

	this.name = url;
	if ( reg ) {
		reg = reg[ reg.length - 1 ];
		ind = reg.lastIndexOf( "." );
		this.name = reg;
		if ( ind >= 0 ) {
			this.name = reg.substr( 0, ind );
			this.extension = reg.substr( ind + 1 ).toLowerCase();
		}
	}

	this.isSupported = $.inArray( this.extension, extArray ) > -1;
	this.isLocal = !!file.name;

	if ( this.isSupported ) {
		this.type =
			extAudio.indexOf( this.extension ) > -1 ? "audio" :
			extVideo.indexOf( this.extension ) > -1 ? "video" : "text";
		if ( this.isLocal ) {
			this.dataFile = file;
		} else {
			this.url = url;
			this.cors = file.cors;
		}
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
