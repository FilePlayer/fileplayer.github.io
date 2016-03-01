"use strict";

(function() {

var
	that,
	brightness
;

api.screen = that = {

	resize: function() {
		var
			r = api.imageRatio,
			w = that.width  = dom.screenVideo.width(),
			h = that.height = dom.screenVideo.height(),
			rElem = w / h
		;
		api.video.width  = r > rElem ? w : h * r;
		api.video.height = r < rElem ? h : w / r;
		return that;
	},
	resizeFilename: function() {
		dom.screenFilename.css(
			"width", ui.listIsOpen()
			? 100 - ui.listWidth() + "%"
			: "100%"
		);
		return that;
	},

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
