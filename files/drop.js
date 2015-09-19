(function() {

$( document.body )
	.on( "dragover", false )
	.on( "drop", function( e ) {
		e = e.originalEvent;

		playerAPI.addFile( e.dataTransfer.files[ 0 ] );

		return false;
	})
;

})();
