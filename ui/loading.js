"use strict";

(function() {

var
	jqTimeSliderParent = dom.ctrlCutesliderPosition.parent()
;

$.extend( ui, {
	loading: function() {
		var file = api.playlist.selectedFile();
		dom.fileplayer
			.removeClass( "audio video" )
			.addClass( "playing " + file.type )
		;
		dom.screenFilenameText
			.attr( "data-type", file.type )
			.add( dom.title )
				.text( file.name )
		;
		dom.ctrlCutesliderPosition.element().val( 0 );
		jqTimeSliderParent.attr( "data-tooltip-content", null );
		api.thumbnail.canvas.drawFromImg();
		return ui;
	},
	loaded: function() {
		var dur = api.video.duration();
		dom.ctrlInputRangePosition.attr( "max", dur );
		api.thumbnail.cache.init( Math.ceil( dur ) );
		return ui;
	}
});

})();
