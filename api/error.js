"use strict";

(function() {

var that;

api.error = that = {
	throw: function( error, data ) {
		var
			title,
			str
		;

		switch ( error ) {

			// File can't be played.
			case "INVALID_FORMAT":
				title = "Incompatible file format";
				str = "The file \"" + data.filename +
					"\" can't be played. Its format (" + data.format +
					") isn't compatible with the <video> HTML5 standard element.";
			break;
			case "INVALID_URL":
				title = "URL, HTTP error " + data.code;
				str = "Can't access to the URL:\n\"" + data.url + "\" (error " + data.code + ").";
			break;
			case "URL_NOT_CORS":
				title = "URL, security, CORS error";
				str = "The url \"" + data.url + "\" can't be reached.";
			break;

			// Features not supported by the browser.
			case "CTRLO_SHORTCUT":
				title = "Browser drawback, security";
				str = "Ctrl+O is not working on your browser. " +
					"Use the folder icon (in the lower left corner) " +
					"or drag and drop your files directly :-)";
			break;
		}

		setTimeout( function() {
			alert( title + " :\n\n" + str );
		}, 1 );

		return that;
	}
}

})();
