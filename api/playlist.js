(function() {

var
	that,
	playMode,
	jqFileSelected = dom.jqEmpty,
	jqFiles = dom.jqEmpty,
	jqList = dom.jqPlaylistList,
	jqVideo = dom.jqPlayerVideo
;

api.playlist = that = {
	push: function( filesWrappers ) {
		var f, i = 0;
		for ( ; f = filesWrappers[ i ]; ++i ) {
			f.url = URL.createObjectURL( f.file );
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
	select: function( elFile ) {
		if ( !elFile ) {
			api.video.stop();
		} else {
			api.video
				.pause()
				.load( elFile.fileWrapper.url )
				.play()
			;
			if ( jqFileSelected ) {
				playlistUI.highlight( jqFileSelected, false );
			}
			playlistUI
				.highlight( elFile.jqThis, true )
				.currentIndex( 1 + jqFiles.index( elFile ) )
			;
			jqFileSelected = elFile.jqThis;
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
