(function() {

var
	tracks = playerAPI.videoElement.textTracks
;

function encodeToWebVTT( fileContent ) {
	return (
		"WEBVTT\n\n" +
		fileContent
			// Delete special encoded characters then make VTT coding style
			.substr( fileContent.indexOf( "1" ) )
			// Replace "," in SRT files by "." in VTT files
			.replace( /(\d{2}),(\d{3})/g, "$1.$2" )
	);
}

$.extend( playerAPI, {
	createSubtitles: function( file ) {
		var
			blob,
			reader = new FileReader()
		;

		reader.onloadend = function () {
			blob = new Blob(
				[ encodeToWebVTT( reader.result ) ],
				{
					type: "text/vtt",
					endings: "transparent"
				}
			);

			blob.url = URL.createObjectURL( blob );

			$( "<track>", {
				kind: "subtitles",
				src: blob.url,
				srclang: "en",
				label: "Subtitles " + ( tracks ? tracks.length + 1 : 1 ),
				name: file.name,
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
		};

		reader.readAsText( file );

		return this;
	}
});

})();
