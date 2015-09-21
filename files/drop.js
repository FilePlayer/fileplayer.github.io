(function() {

$( document.body )
	.on( "dragover", false )
	.on( "drop", function( e ) {
		e = e.originalEvent;

		var file = e.dataTransfer.files[ 0 ];

		if ( file ) {
			playerAPI.addFile( file );
		}

		return false;
	})
;

})();
