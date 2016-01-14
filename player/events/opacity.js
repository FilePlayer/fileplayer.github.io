(function() {

dom.jqPlayerOpacitySlider.change( function() {
	api.video.opacity( this.value );
});

dom.jqPlayerOpacityIcon.click( api.video.opacityToggle );

})();
