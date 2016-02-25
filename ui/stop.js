"use strict";

(function() {

var jqTimeSliderParent = dom.ctrlCutesliderPosition.parent();

$.extend( ui, {
	stop: function() {
		dom.fileplayer.removeClass( "playing audio video" );
		dom.screenFilenameText.empty();
		dom.title.text( "FilePlayer" );
		api.thumbnail.canvas.drawFromImg();
		jqTimeSliderParent.attr( "data-tooltip-content", null );
		return ui
			.pause()
			.currentTime( 0 )
			.duration( 0 )
			.actionDesc( "stop" )
		;
	}
});

})();
