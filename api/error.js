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
			case "FORMAT_UNSUPPORTED":
				str = "Format unsupported : The file " + data.file + " can't be played";
			break;
			case "URL_UNSUPPORTED":
				str = "URL not supported : The url " + data.file + " can't be played (" + data.urlError + ")";
			break;
			case "URL_UNSUPPORTED_CORS":
				str = "URL not supported : The url " + data.file + " can't be played (CORS issue)";
			break;
			default: 
				str = "Error " + error;
			break;
		}
	alert( str );
	return that;
	}
}

})();
