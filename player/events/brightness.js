"use strict";

(function() {

dom.ctrlBrightnessSlider.change( function() {
	api.screen.brightness( this.value );
});

dom.ctrlBrightnessIcon.click( api.screen.brightnessToggle );

})();
