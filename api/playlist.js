"use strict";

(function() {

var
	that,
	playMode,
	fileWrapper = {},
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
			extText = "srt-vtt",
			extMedia = "mp3-mp4-mpeg-ogg-wav-webm-mpg-weba-ogm"
		;

		$.each( files, function() {
			var
				name = this.name,
				ind = name.lastIndexOf( "." ),
				ext = name.substr( ind + 1 ).toLowerCase(),
				debug = "[" + this.type + "] [" + ext + "]",
				fileWrapper = {
					file: this,
					extension: ext,
					name: name.substr( 0, ind ),
					type: this.type.substr( 0, this.type.indexOf( "/" ) )
				}
			;

			if ( extMedia.indexOf( ext ) > -1 ) {
				fMediaWraps.push( fileWrapper );
			} else if ( extText.indexOf( ext ) > -1 ) {
				fTextWraps.push( fileWrapper );
			} else {
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

			fWrap.url = URL.createObjectURL( fWrap.file );
			if ( jqFileSelected.length && jqFileSelected[ 0 ] !== elFile ) {
				URL.revokeObjectURL( jqFileSelected[ 0 ].fileWrapper.url );
				playlistUI.highlight( jqFileSelected, false );
			}
			playlistUI
				.highlight( elFile.jqThis, true )
				.updateIndex()
			;
			api.subtitles.disable();
			if ( fWrap.type !== fileWrapper.type ) {
				api.visualisations.toggle( fWrap.type === "audio" );
				fileWrapper = fWrap;
			}
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
		playlistUI.playingMode( mode );
		Cookies.set( "playlistmode", mode, { expires: 365 } );
		return that;
	}
};

// The videoElement has no "stop" event.
// But the api.video has a .stop() methode anyway, this methode trigger("stop").
dom.screenVideo.on( "ended", function() {
	switch ( playMode ) {
		case "loopOne" :
			api.video
				.currentTime( 0 )
				.play()
			;
			return;
		case "loopAll" :
			that.next();
			return;
		case true :
			if ( jqFileSelected.next().length ) {
				that.next();
				return;
			}
	}
	api.video.stop();
});

})();
