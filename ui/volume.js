"use strict";

ui.volume = function( vol ) {
	dom.ctrlVolumeIcon
		.removeClass( "fa-volume-off fa-volume-down fa-volume-up" )
		.addClass(
			!vol
				? "fa-volume-off"
				: vol < .5
					? "fa-volume-down"
					: "fa-volume-up"
		)
	;
	dom.ctrlVolumeSlider.element().val( vol );
	return ui.actionDesc( "Volume : " + utils.fPercent( vol ) );
};
