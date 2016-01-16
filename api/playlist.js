"use strict";

(function() {

var
	that,
	playMode,
	fileWrapper = {},
	isShuffled = false,
	jqFiles = dom.jqEmpty,
	jqFilesSave = dom.jqEmpty,
	jqFileSelected = dom.jqEmpty,
	jqList = dom.jqPlaylistList,
	jqVideo = dom.jqPlayerVideo
;

api.playlist = that = {
	dialogueFiles: function() {
		dom.jqPlaylistInputFile.click();
		return that;
	},
	push: function( filesWrappers ) {
		var f, i = 0;
		for ( ; f = filesWrappers[ i ]; ++i ) {
			playlistUI.append( f );
		}
		jqFiles = jqList.children();
		playlistUI.totalFiles( jqFiles.length );
		return that;
	},
	pushAndPlay: function( filesWrappers ) {
		var last = jqFiles.get( -1 );
		that.push( filesWrappers );
		if ( last !== jqFiles.get( -1 ) ) {
			that.select( last ? last.jqThis.next()[ 0 ] : jqFiles.get( 0 ) );
		}
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
				.currentIndex( 1 + jqFiles.index( elFile ) )
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
		return jqFileSelected[ 0 ] && jqFileSelected[ 0 ].fileWrapper;
	},
	prev: function() {
		return that.select( jqFileSelected.prev()[ 0 ] || jqFiles.get( -1 ) );
	},
	next: function() {
		return that.select( jqFileSelected.next()[ 0 ] || jqFiles.get( 0 ) );
	},

	shuffle: function( b ) {
		if ( typeof b !== "boolean" ) {
			b = !isShuffled;
		}
		if ( b !== isShuffled ) {
			var len = jqFiles.length;

			// Shuffle: false, reset the old order.
			if ( !b ) {
				// Prepent because we want to let the new dropped files at the end.
				jqList.prepend( jqFilesSave );

			// Shuffle: true, if there are more than one files we proceed.
			} else if ( len > 1 ) {
				jqFilesSave = jqList.children();
				jqFiles.each( function() {
					jqFiles
						.eq( Math.floor( Math.random() * len ) )
						.after( this )
					;
				});
				// Always put the selected file on the first place.
				jqList.prepend( jqFileSelected );
			}

			// Synchronise jqFiles and playlistUI.
			jqFiles = jqList.children();
			playlistUI
				.shuffle( isShuffled = b )
				.currentIndex( 1 + jqFiles.index( jqFileSelected ) )
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
		return that;
	}
};

// The videoElement has no "stop" event.
// But the api.video has a .stop() methode anyway, this methode trigger("stop").
jqVideo.on( "ended", function() {
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
