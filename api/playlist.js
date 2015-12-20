(function() {

var
	that,
	playMode,
	nodeSelected = null,
	listFiles = utils.list(),
	jqVideo = dom.jqPlayerVideo
;

api.playlist = that = {
	push: function( file ) {
		playlistUI.append(
			listFiles.pushBack({
				file : file,
				url  : URL.createObjectURL( file )
			})
		);
		return that;
	},
	pushAndPlay: function( file ) {
		var lastNode = listFiles.last;
		that.push( file );
		return that.select( lastNode ? lastNode.next : listFiles.first );
	},
	select: function( node ) {
		if ( node === null ) {
			api.video.stop();
		} else {
			api.video
				.pause()
				.load( node.data.url )
				.play()
			;
			if ( nodeSelected ) {
				playlistUI.highlight( nodeSelected.data, false );
			}
			playlistUI.highlight( node.data, true );
			nodeSelected = node;
		}
		return that;
	},
	prev: function() {
		if ( nodeSelected ) {
			that.select( nodeSelected.prev );
		}
		return that;
	},
	next: function() {
		if ( nodeSelected ) {
			that.select( nodeSelected.next );
		}
		return that;
	},

	// The `mode` specify the action to do at the end of the current file :
	// false -----> nothing more.
	// true ------> play the next file.
	// "loopOne" -> replay the same file.
	// "loopAll" -> play the next file, at the end of the playlist it will play the first file.
	autoplay: function( mode ) {
		playMode = mode;
		listFiles.circular( mode === "loopAll" );
		return that;
	}
};

api.playlist.autoplay( true );

// The videoElement has no "stop" event.
// But the api.video has a .stop() methode anyway, this methode trigger("stop").
jqVideo.on( "ended", function() {
	switch ( playMode ) {
		case false :
			api.video.stop();
		break;
		case "loopOne" :
			api.video
				.currentTime( 0 )
				.play()
			;
		break;
		default :
			that.select( nodeSelected.next );
	}
});

})();
