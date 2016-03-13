"use strict";

ui.speed = function( rate ) {
	var val = rate.toFixed( 2 ) + "x";
	dom.ctrlSpeedSlider.element().val( rate );
	dom.ctrlSpeedValue.text( val );
	return ui.actionDesc( "Speed : " + val );
};
