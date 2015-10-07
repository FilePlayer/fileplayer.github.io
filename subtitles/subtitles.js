(function() {

var
	tracks = playerAPI.videoElement.textTracks,
	jqSubtitlesList = $(".menu.subtitles .menu-list");
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
			reader = new FileReader()
		;

		reader.onloadend = function () {
			var
				blob,
				tracksLen = tracks ? tracks.length : 0
				menulistLen = jqSubtitlesList.children().length
			;

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
				label: "Subtitles " + ( tracksLen + 1 ),
				name: file.name,
				on: {
					load: ( function( len ) {
						return function( e ) {
							tracks[ len ].mode = "hidden";
							playerAPI
								.subtitlesSelect( len )
								.subtitlesEnable( true )
							;
						};
					})( tracksLen )
				}
			}).appendTo( playerAPI.videoElement );

			jqSubtitlesList.children().removeClass( "selected" )

			// Add file name in subtitles list
			jqSubtitlesList.append(
				$( "<li>", {
					text: file.name,
					"data-jquery-element": "tooltip",
					"data-tooltip-content": file.name,
					"data-tooltip-side": "left",
					on: {
						click: ( function( id ) {
							return function ( e ) {
								playerAPI.subtitlesSelect( id - 1 )
								jqSubtitlesList.children().removeClass( "selected" )
								$( jqSubtitlesList.children()[ id ] ).addClass( "selected" )
							}
						})( menulistLen )
					}
				}).addClass( "selected" )
			);

			// Chrome will start loading the track only
			// after the `mode` attribute is set to "showing".
			// The `if` is necessary for Firefox.
			if ( tracks[ tracksLen ] ) {
				tracks[ tracksLen ].mode = "showing";
			}
		};

		reader.readAsText( file );

		return this;
	}
});

})();
