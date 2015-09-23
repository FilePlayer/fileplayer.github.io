(function() {

$( document.body )
	.on( "dragover", false )
	.on( "drop", function( e ) {
		e = e.originalEvent;

		$.each( e.dataTransfer.files, function() {
			playerAPI.addFile( this );
		});

		return false;
	})
;

})();
