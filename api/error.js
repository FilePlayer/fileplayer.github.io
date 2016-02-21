"use strict";

(function() {

var
	that
;

api.error = that = {
	// data : [{file, urlError}, ...]
	throw: function( error, data ) {

		var
			str
		;

		switch( error ) {
			// file can't be played
			case "INVALID_FORMAT":
				str = "Error : Invalid file format : The file " + data.file + " can't be played";
			break;
			case "URL_UNSUPPORTED":
				str = "Error : URL not supported : The url " + data.file + " can't be played (" + data.urlError + ")";
			break;
			case "URL_UNSUPPORTED_CORS":
				str = "Error : URL not supported : The url " + data.file + " can't be played (CORS issue)";
			break;
			// features not supported by the browser
			case "CTRLO_SHORTCUT":
				str = "Sorry... CTRL+O can't work on your browser.\nUse the folder icon (in the lower left corner) or drag and drop your files directly :-)";
			break;
			default:
				str = "Error : " + error;
			break;
		}

		setTimeout( function() {
			alert( str );
		}, 1 );

		return that;
	}
}

})();
