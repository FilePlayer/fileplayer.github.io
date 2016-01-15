"use strict";

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
				arrayFiles.push( file );
				--nbFiles;
				apiAdd();
			});
		} else if ( item.isDirectory ) {
			++nbFiles;
			dirReader = item.createReader();
			dirReader.readEntries( function( items ) {
				$.each( items, function() {
					traverseTree( this );
				});
				--nbFiles;
			});
		}
	}

	$.each( items, function() {
		var file = this.webkitGetAsEntry();
		if ( file ) {
			traverseTree( file );
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
