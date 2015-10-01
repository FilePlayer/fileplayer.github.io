// Debug
function lg( s ) { console.log( s ); }

(function() {

var
	jqVideo = $( "video.main" ),
	jqVideoThumbnail = $( "video.thumbnail" )
;

// Global object for the API
window.playerAPI = {
	jqDocument: $( document ),
	jqPlayer: $( "#player" ),
	jqVideoElement: jqVideo,
	jqVideoThumbnail: jqVideoThumbnail,
	videoElement: jqVideo[ 0 ],
	videoThumbnail: jqVideoThumbnail[ 0 ]
};

})();
