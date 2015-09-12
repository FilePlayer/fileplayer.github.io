// Debug
function lg( s ) { console.log( s ); }

(function() {

var
	jqVideo = $( "video" )
;

// Global object for the API
window.playerAPI = {
	jqDocument: $( document ),
	jqBody: $( document.body ),
	jqVideoElement: jqVideo,
	videoElement: jqVideo[ 0 ]
};

})();
