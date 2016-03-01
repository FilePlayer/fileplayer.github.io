"use strict";

(function() {

var
	that,
	playMode,
	isShuffled = false,
	jqFilesSave = dom.empty,
	jqFileSelected = dom.empty,
	jqList = dom.playlistList
;

api.playlist = that = {
	dialogueFiles: function() {
		dom.playlistInputFile.click();
		return that;
	},
	addFiles: function( files, autoplay ) {
		var
			jqFilesAdded,
			fMediaWraps = [],
			fTextWraps = [],
			promisesList = []
		;

		function sortFiles( index, reader, fileWrapper, file ) {
			var p = new Promise( function( resolve, rejecte ) {
				reader.onload = function ( e ) {
					fMediaWraps.push( fileWrapper );
					return resolve( fileWrapper );
				};
				reader.onerror = function ( e ) {
					api.error.throw( "NO_FOLDERS", {
						filename: fileWrapper.name
					});
					return resolve( fileWrapper );
				};
			});
			reader.readAsText( file );
			return p;
		};

		$.each( files, function( index ) {
			var
				reader,
				fileWrapper = new api.file( this )
			;

			fileWrapper.index = index;
			if ( fileWrapper.isText ) {
				fTextWraps.push( fileWrapper );
			} else if ( !fileWrapper.isMedia &&
				window.isFirefox && ( reader = new FileReader( this ) )
			) {
				promisesList.push( sortFiles( index, reader, fileWrapper, this ) );
			} else {
				fMediaWraps.push( fileWrapper );
			}
		});

		Promise
			.all( promisesList )
			.then( function() {
				fMediaWraps.sort( function( a, b ) {
					 return a.index - b.index;
				});

				jqFilesAdded = ui.listAdd( fMediaWraps );
				ui
					.listUpdate()
					.totalFiles()
				;
				if ( autoplay && jqFilesAdded.length ) {
					that.select( jqFilesAdded[ 0 ] );
				}

				// Add subtitles AFTER adding the media file.
				$.each( fTextWraps, function() {
					api.subtitles.newTrack( this );
				});
		});

		return that;
	},
	extractAddFiles: function( files, autoplay ) {
		function call() {
			if ( --nbFiles === 0 ) {
				that.addFiles( arrayFiles, autoplay );
			}
		}

		function traverseTree( item ) {
			if ( item.isFile ) {
				item.file( function( file ) {
					arrayFiles.push( file );
					call();
				});
			} else if ( item.isDirectory ) {
				dirReader = item.createReader();
				dirReader.readEntries( function( files ) {
					nbFiles += files.length;
					call();
					$.each( files, function() {
						traverseTree( this );
					});
				});
			}
		}

		var
			item,
			dirReader,
			nbFiles = files.length,
			arrayFiles = []
		;

		$.each( files, function() {
			if ( item = this.webkitGetAsEntry() ) {
				traverseTree( item );
			}
		});

		return that;
	},
	select: function( elFile, noScroll ) {
		if ( !elFile ) {
			api.video.stop();
		} else {
			var fWrap = elFile.fileWrapper;

			fWrap.createURL();
			if ( jqFileSelected.length && jqFileSelected[ 0 ] !== elFile ) {
				jqFileSelected[ 0 ].fileWrapper.revokeURL();
			}
			ui
				.fileSelect( elFile.jqThis )
				.indexFile()
			;
			api.subtitles.disable();
			if ( !noScroll ) {
				ui.scrollToSelection();
			}
			jqFileSelected = elFile.jqThis;
			if ( fWrap.isSupported ) {
				api.loadFile( fWrap );
				api.video.play();
			} else {
				api.error.throw( fWrap.extension ? "INVALID_FORMAT" : "UNKNOWN_EXT", {
					filename: fWrap.name,
					format: fWrap.extension
				});
				api.video.stop();
			}
		}
		return that;
	},
	selectedFile: function() {
		return ( jqFileSelected[ 0 ] || null ) && jqFileSelected[ 0 ].fileWrapper;
	},
	prev: function() {
		return that.select( jqFileSelected.prev()[ 0 ] || ui.jqFiles.get( -1 ) );
	},
	next: function() {
		return that.select( jqFileSelected.next()[ 0 ] || ui.jqFiles.get( 0 ) );
	},

	shuffle: function( b ) {
		if ( typeof b !== "boolean" ) {
			b = !isShuffled;
		}
		if ( b !== isShuffled ) {
			var len = ui.jqFiles.length;

			// Shuffle: false, reset the old order.
			if ( !b ) {
				// Prepent because we want to let the new dropped files at the end.
				jqList.prepend( jqFilesSave );

			// Shuffle: true, if there are more than one files we proceed.
			} else if ( len > 1 ) {
				jqFilesSave = jqList.children();
				ui.jqFiles.each( function() {
					ui.jqFiles
						.eq( Math.floor( Math.random() * len ) )
						.after( this )
					;
				});
				// Always put the selected file on the first place.
				jqList.prepend( jqFileSelected );
			}

			ui
				.shuffle( isShuffled = b )
				.listUpdate()
				.indexFile()
				.scrollToSelection()
			;
		}
		return that;
	},

	// The `mode` specify the action to do at the end of the current file :
	// false -----> nothing more.
	// true ------> play the next file.
	// "loopOne" -> replay the same file.
	// "loopAll" -> play the next file, at the end of the playlist it will play the first file.
	repeat: function( mode ) {
		if ( !arguments.length ) {
			return playMode;
		}
		playMode = mode;
		api.video.loop( mode === "loopOne" );
		ui.repeat( mode );
		Cookies.set( "playlistmode", mode, { expires: 365 } );
		return that;
	}
};

})();
