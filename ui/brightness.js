"use strict";

$.extend( ui, {
	brightness: function( op ) {
		dom.screenBrightness.css( "opacity", op );
		dom.ctrlBrightnessSlider.element().val( op );
		dom.ctrlBrightnessIcon
			.removeClass( "fa-moon-o fa-lightbulb-o" )
			.addClass( op < .5 ? "fa-moon-o" : "fa-lightbulb-o" )
		;
		dom.ctrlBrightnessValue.text( utils.fPercent( op ) );
		return ui;
	}
});
