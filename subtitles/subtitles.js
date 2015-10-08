(function() {

var
	tracks = playerAPI.videoElement.textTracks,
	jqSubtitlesList = $( ".menu.subtitles .menu-list", playerAPI.jqControls );
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
				tracksLen = tracks ? tracks.length : 0,
				menulistLen = jqSubtitlesList.children().length - 1
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

			jqSubtitlesList.children().removeClass( "selected" );

			// Add file name in subtitles list
			$( "<li>", {
				text: file.name,
				class: "selected",
				"data-jquery-element": "tooltip",
				"data-tooltip-content": file.name,
				"data-tooltip-side": "left",
				on: {
					click: ( function( id ) {
						return function () {
							playerAPI.subtitlesSelect( id );
							jqSubtitlesList.children().removeClass( "selected" );
							jqSubtitlesList.children().eq( id ).addClass( "selected" );
						}
					})( menulistLen )
				}
			}).appendTo( jqSubtitlesList );

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
