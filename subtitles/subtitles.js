(function() {

var
	tracks = playerAPI.videoElement.textTracks
;

$.extend( playerAPI, {
	addSubtitles: function( url ) {
		$( "<track>", {
			kind: "subtitles",
			src: url,
			srclang: "en",
			label: "Subtitles " + ( tracks ? tracks.length + 1 : 1 ),
			on: {
				load: function() {
					// Set this track to be the active one
					tracks[ 0 ].mode = "showing";
				}
			}
		}).appendTo( playerAPI.videoElement );
		return this;
	}
});

})();
