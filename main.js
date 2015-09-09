function lg(s) { console.log(s); }

// Global object
window.player = {
	controls: {}
};

var
	elBody = document.body,
	elVideo = document.querySelector( "video" )
;

elBody.ondragover = function() {
	lg( "body:ondragover" );
	return false;
};

elBody.ondrop = function( e ) {
	lg( "body:ondrop" );

	var
		// Save file's informations
		dropFile = e.dataTransfer.files[ 0 ],
		// Create a temporary fake absolute path to the dropped file
		dropFileUrl = URL.createObjectURL( dropFile )
	;

	// Check type file, eg : "video/mp4" -> "video"
	switch ( dropFile.type.substr( 0, dropFile.type.indexOf( "/" ) ) ) {

		case "video" :
			elVideo.src = dropFileUrl;
			player.controls.play();
		break;

		default :
			switch ( dropFile.name.substr( dropFile.name.lastIndexOf( "." ) + 1 ) ) {

				case "vtt" :
					var elTrack = document.createElement( "track" );
					elTrack.kind = "subtitles";
					elTrack.src = dropFileUrl;
					elTrack.label = "Subtitles " + ( elVideo.textTracks ? elVideo.textTracks.length + 1 : 1 );
					elTrack.srclang = "en"; // TODO: We must find a way to made it generically
					elVideo.appendChild( elTrack );
					elTrack.addEventListener( "load", function() {
						// Set this track to be the active one
						this.mode =
						elVideo.textTracks[ 0 ].mode = "showing";
					});
				break;
			}
	}

	return false;
};
