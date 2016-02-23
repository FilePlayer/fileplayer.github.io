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
			fTextWraps = []
		;

		$.each( files, function() {
			var
				reader = new FileReader( this ),
				fileWrapper = new api.file( this ),
				ext = fileWrapper.extension,
				debug = "[" + fileWrapper.mediaType + "] [" + ext + "]"
			;

			// For folders detection for Fx
			if ( reader ) {
				reader.onload = function ( e ) {
					api.error.throw( "INVALID_FORMAT", {
						filename : fileWrapper.name,
						format : fileWrapper.extension
					});
				};
				reader.onerror = function ( e ) {
					api.error.throw( "NO_FOLDERS", {
						filename : fileWrapper.name
					});
				};
			}

			if ( fileWrapper.isMedia ) {
				fMediaWraps.push( fileWrapper );
			} else if ( fileWrapper.isText ) {
				fTextWraps.push( fileWrapper );
			} else {
				if ( reader ) {
					reader.readAsText( this );
				} else {
					api.error.throw( "INVALID_FORMAT", {
						filename : fileWrapper.name,
						format : fileWrapper.extension
					});
				}
				lg( "DROP: not supported: " + debug );
				return;
			}
			lg( "DROP: supported: " + debug );
		});

		jqFilesAdded = playlistUI.addFiles( fMediaWraps );
		playlistUI
			.updateList()
			.updateTotal()
		;
		if ( autoplay && jqFilesAdded.length ) {
			that.select( jqFilesAdded[ 0 ] );
		}

		// Add subtitles AFTER adding the media file.
		$.each( fTextWraps, function() {
			api.subtitles.newTrack( this );
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
			playlistUI
				.select( elFile.jqThis )
				.updateIndex()
			;
			api.subtitles.disable();
			if ( !noScroll ) {
				playlistUI.scrollToSelection();
			}
			jqFileSelected = elFile.jqThis;
			api.video
				.pause()
				.load( fWrap.url )
				.play()
			;
		}
		return that;
	},
	selectedFile: function() {
		return ( jqFileSelected[ 0 ] || null ) && jqFileSelected[ 0 ].fileWrapper;
	},
	prev: function() {
		return that.select( jqFileSelected.prev()[ 0 ] || playlistUI.jqFiles.get( -1 ) );
	},
	next: function() {
		return that.select( jqFileSelected.next()[ 0 ] || playlistUI.jqFiles.get( 0 ) );
	},

	shuffle: function( b ) {
		if ( typeof b !== "boolean" ) {
			b = !isShuffled;
		}
		if ( b !== isShuffled ) {
			var len = playlistUI.jqFiles.length;

			// Shuffle: false, reset the old order.
			if ( !b ) {
				// Prepent because we want to let the new dropped files at the end.
				jqList.prepend( jqFilesSave );

			// Shuffle: true, if there are more than one files we proceed.
			} else if ( len > 1 ) {
				jqFilesSave = jqList.children();
				playlistUI.jqFiles.each( function() {
					playlistUI.jqFiles
						.eq( Math.floor( Math.random() * len ) )
						.after( this )
					;
				});
				// Always put the selected file on the first place.
				jqList.prepend( jqFileSelected );
			}

			// Synchronise jqFiles and playlistUI.
			playlistUI
				.shuffle( isShuffled = b )
				.updateList()
				.updateIndex()
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
	playingMode: function( mode ) {
		if ( !arguments.length ) {
			return playMode;
		}
		playMode = mode;
		api.video.loop( mode === "loopOne" );
		playlistUI.playingMode( mode );
		Cookies.set( "playlistmode", mode, { expires: 365 } );
		return that;
	}
};

// What to do at the end of the file.
// Note: the "loopOne" mode desn't have an end (cf: the loop attribute).
dom.screenVideo.on( "ended", function() {
	if ( playMode === "loopAll" || playMode === true && jqFileSelected.next().length ) {
		that.next();
		return;
	}
	api.video.stop();
});

})();
