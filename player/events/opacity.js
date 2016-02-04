"use strict";

(function() {

dom.ctrlBrightnessSlider.change( function() {
	api.video.opacity( this.value );
});

dom.ctrlBrightnessIcon.click( api.video.opacityToggle );

})();
