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
					tracks[ 0 ].mode = "hidden";
					playerAPI
						.subtitlesSelect( 0 )
						.subtitlesEnable( true )
					;
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
