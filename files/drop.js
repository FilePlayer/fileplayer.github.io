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
		if ( ( data = e.originalEvent.dataTransfer ) ) {
			// Drop folders only on Chrome
			if ( data.items ) {
				$.each( data.items, function( key, item ) {
					if ( ( item = item.webkitGetAsEntry() ) ) {
						isFileOrDirectory( item );
 					}
				});
			}
			else if ( data.files ) {
				$.each( data.files, function( key, file ) {
					playerAPI.addFile( file );
				});
			}
		}

		return false;
	})
;

})();
