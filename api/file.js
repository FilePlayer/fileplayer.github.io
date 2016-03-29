"use strict";

(function() {

var
	extAudio = "mp3-ogg-wav-weba",
	extVideo = "mp4-ogm-mpeg-mpg-webm",
	extArray = "mp3-mp4-mpeg-ogg-wav-webm-mpg-weba-ogm-srt-vtt".split( "-" )
;

function cutName( that, s ) {
	s = s || "";
	var i = s.lastIndexOf( "." );
	that.name = i < 0 ? s : s.substr( 0, i );
	that.extension = i < 0 ? "" : s.substr( i + 1 ).toLowerCase();
}

api.file = function( file ) {
	var name = file.name || file.url;
	this.isLocal = !!file.name;
	if ( !this.isLocal ) {
		name = name.match( /([^/?#]*)\.([^./?#]+)/g );
		name = name && name[ name.length - 1 ];
	}
	cutName( this, name );

	this.isSupported = $.inArray( this.extension, extArray ) > -1;
	if ( this.isSupported ) {
		this.type =
			extAudio.indexOf( this.extension ) > -1 ? "audio" :
			extVideo.indexOf( this.extension ) > -1 ? "video" : "text";
		if ( this.isLocal ) {
			this.dataFile = file;
		} else {
			this.url = file.url;
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
