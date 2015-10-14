(function() {

function isFileOrDirectory( item ) {
	if ( item.isFile ) {
		item.file( function( file ) {
			api.files.add( file );
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

dom.jqBody.on( {
	dragover: false,
	drop: function( e ) {
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
					api.files.add( file );
				});
			}
		}
		return false;
	}
});

})();
