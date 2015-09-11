(function() {

var
	trackCurrent,
	tracks = playerAPI.videoElement.textTracks
;

function activeSubtitles( ind ) {
	if ( trackCurrent ) {
		trackCurrent.mode = "disabled";
	}
	trackCurrent = tracks[ ind ];
	trackCurrent.mode = "showing";
}

$.extend( playerAPI, {
	addSubtitles: function( url ) {
		$( "<track>", {
			kind: "subtitles",
			src: url,
			srclang: "en",
			label: "Subtitles " + ( tracks ? tracks.length + 1 : 1 ),
			on: {
				load: function() {
					activeSubtitles( 0 );
				}
			}
		}).prependTo( playerAPI.videoElement );

		// Chrome will start loading the track only
		// after the `mode` attribute is set to "showing".
		// The `if` is necessary for Firefox.
		if ( tracks[ 0 ] ) {
			tracks[ 0 ].mode = "showing";
		}

		return this;
	}
});

})();
