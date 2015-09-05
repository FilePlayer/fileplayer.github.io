function lg(s) { console.log(s); }

var
	elBody = document.body,
	elVideo = document.querySelector( "video" )
;

elBody.ondragover = function() {
	lg("body:ondragover");
	return false;
};

elBody.ondrop = function( e ) {
	lg("body:ondrop");
	elVideo.src = URL.createObjectURL( e.dataTransfer.files[ 0 ] );
	elVideo.play();
	return false;
};
