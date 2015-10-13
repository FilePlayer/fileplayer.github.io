(function() {

var v;

window.dom = {
	jqDoc: $( document ),
	jqBody: $( document.body ),
	jqPlayer: $( "#player" ),
	jqPlayerTitle: $( "#titleFile" ),
	jqPlayerShortcutDesc: $( "#shortcutDesc" ),
	jqPlayerCue: $( "#cues > *" ),
	jqPlayerCtrl: $( "#ctrl" ),
	jqPlayerVideo: v = $( "#player video.main" ),
	elPlayerVideo: v[ 0 ],
	jqPlayerThumbnail: $( "#player .thumbnail" ),
	jqPlayerThumbnailVideo: v = $( "#player .thumbnail video" ),
	elPlayerThumbnailVideo: v[ 0 ],
	jqPlayerThumbnailCanvas: v = $( "#player .thumbnail canvas" ),
	elPlayerThumbnailCanvas: v[ 0 ]
};

})();
