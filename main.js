// Debug
function lg( s ) { console.log( s ); }

// Global object for the API
window.playerAPI = {};

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
			playerAPI.play( true );
		break;

		default :
			switch ( dropFile.name.substr( dropFile.name.lastIndexOf( "." ) + 1 ) ) {

				case "vtt" :
					playerAPI.addSubtitles( dropFileUrl );
				break;
			}
	}

	return false;
};
