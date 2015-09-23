(function() {

function isFileOrDirectory( item ) {
	if ( item.isFile ) {
		item.file( function( file ) {
			playerAPI.addFile( file );
		});
	} else if ( item.isDirectory ) {
		var dirReader = item.createReader();
		dirReader.readEntries( function( entries ) {
			$.each( entries, function( key, entry ) {
				isFileOrDirectory( entry );
			});
		});
	}
}

$( document.body )
	.on( "dragover", false )
	.on( "drop", function( e ) {
		if ( ( data = e.originalEvent.dataTransfer ) ){
			// Chrome support
			if ( data.items ) {
				$.each( data.items, function( key, item ) {
					if ( ( item = item.webkitGetAsEntry() ) ) {
						isFileOrDirectory( item );
 					}
				});
			}
			// Mozilla does support directory
			else if ( data.files ){
				$.each( data.files, function( key, file ) {
					playerAPI.addFile( files );
				});
			}
		}

		return false;
	})
;

})();
