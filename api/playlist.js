(function() {

var
	that,
	playMode,
	jqFileSelected = $(),
	jqFiles = dom.jqPlaylistList,
	jqVideo = dom.jqPlayerVideo
;

function firstFile() {
	return jqFiles.children()[ 0 ];
}

function lastFile() {
	var children = jqFiles.children();
	return children[ children.length - 1 ];
}

api.playlist = that = {
	push: function( filesWrappers ) {
		var f, i = 0;
		for ( ; f = filesWrappers[ i ]; ++i ) {
			f.url = URL.createObjectURL( f.file );
			playlistUI.append( f );
		}
		return that;
	},
	pushAndPlay: function( filesWrappers ) {
		var last = lastFile();
		that.push( filesWrappers );
		if ( last !== lastFile() ) {
			that.select( last ? last.jqThis.next()[ 0 ] : firstFile() );
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
			playlistUI.highlight( elFile.jqThis, true );
			playerUI.title( elFile.fileWrapper.name );
			jqFileSelected = elFile.jqThis;
		}
		return that;
	},
	prev: function() {
		return that.select( jqFileSelected.prev()[ 0 ] || lastFile() );
	},
	next: function() {
		return that.select( jqFileSelected.next()[ 0 ] || firstFile() );
	},

	// The `mode` specify the action to do at the end of the current file :
	// false -----> nothing more.
	// true ------> play the next file.
	// "loopOne" -> replay the same file.
	// "loopAll" -> play the next file, at the end of the playlist it will play the first file.
	autoplay: function( mode ) {
		playMode = mode;
		return that;
	}
};

api.playlist.autoplay( true );

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


$(function() {api.playlist.pushAndPlay( [] );})

})();
