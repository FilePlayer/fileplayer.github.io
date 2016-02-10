"use strict";

(function() {

var
	that
;

api.request = that = {

	// Check if the URL come back with the header: Access-Control-Allow-Origin: "*".
	checkCORS: function( url, fn ) {

		// A checked variable is needed because the xhr.abort calls the jqXHR.error callback.
		var checked = 0;

		$.ajax( {
			url: url,
			dataType: "text",
			xhrFields: {
			    onprogress: function( e ) {
			    	if ( !checked++ ) {
			    		fn( 200 <= this.status && this.status < 300 );
				    	this.abort();
				    }
			    }
			},
			error: function() {
				if ( !checked++ ) {
					fn( false );
				}
			},

			// Normally the request doesn't have the time to success.
			success: function() {
				if ( !checked++ ) {
					fn( true );
				}
			}
		});
		return that;
	}
};

})();
