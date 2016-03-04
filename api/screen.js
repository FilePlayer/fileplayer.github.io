"use strict";

(function() {

var
	that,
	brightness
;

api.screen = that = {
	brightness: function( o ) {
		if ( arguments.length === 0 ) {
			return brightness;
		}
		brightness = utils.range( 0, o, 1, brightness );
		ui.brightness( brightness );
		Cookies.set( "brightness", brightness, { expires: 365 } );
		return that;
	},
	brightnessToggle: function( b ) {
		if ( typeof b !== "boolean" ) {
			b = brightness < 1;
		}
		return that.brightness( b ? 1 : .25 );
	}
};

})();
