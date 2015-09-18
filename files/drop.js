(function() {

function isFileOrDirectory( item ) {
	if ( item.isFile ){
		item.file( function( file ) {
			playerAPI.checkExtension( file );
		});
	}
	else if ( item.isDirectory ) {
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
		e = e.originalEvent;
		data = e.dataTransfer;

		// Chrome support
		if ( data.items ){
			$.each( data.items, function( key, item ) {
				if ( ( item = item.webkitGetAsEntry() ) ) {
					isFileOrDirectory( item );
				}
			});
		}
		// Firefox does not support directories, so I don't handle it.
		else if ( data.files ) {
			$.each( data.files, function( key, file ) {
				playerAPI.checkExtension( file );
			});
		}

		return false;
	})
;

})();
