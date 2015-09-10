(function() {

var
	subtitles = window.player.subtitles
;

$.extend( subtitles, {
	addTrack: function( url ) {
		var elTrack = document.createElement( "track" );
		elTrack.kind = "subtitles";
		elTrack.src = url;
		elTrack.label = "Subtitles " + ( elVideo.textTracks ? elVideo.textTracks.length + 1 : 1 );
		elTrack.srclang = "en"; // TODO: We must find a way to made it generically
		elVideo.appendChild( elTrack );
		elTrack.addEventListener( "load", function() {
			// Set this track to be the active one
			this.mode =
			elVideo.textTracks[ 0 ].mode = "showing";
		});
		return this;
	}
});

})();
