(function() {

function addItems( items ) {
	var
		dirReader,
		nbFiles = 0,
		arrayFiles = [],
		traversing = true,
		alreadyAdded = false
	;

	function apiAdd() {
		if ( !traversing && !nbFiles && !alreadyAdded ) {
			alreadyAdded = true;
			api.files.add( arrayFiles );
		}
	}

	function traverseTree( item ) {
		if ( item.isFile ) {
			++nbFiles;
			item.file( function( file ) {
				--nbFiles;
				arrayFiles.push( file );
				apiAdd();
			});
		} else if ( item.isDirectory ) {
			dirReader = item.createReader();
			dirReader.readEntries( function( items ) {
				$.each( items, function() {
					traverseTree( this );
				});
			});
		}
	}

	$.each( items, function() {
		if ( item = this.webkitGetAsEntry() ) {
			traverseTree( item );
		}
	});

	traversing = false;
	apiAdd();
}

dom.jqBody.on( {
	dragover: false,
	drop: function( e ) {
		var data = e.originalEvent.dataTransfer;
		if ( data ) {

			// Chrome :
			if ( data.items ) {
				addItems( data.items );

			// Everyone else :
			} else if ( data.files ) {
				api.files.add( data.files );
			}
		}
		return false;
	}
});

})();
