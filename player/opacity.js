(function() {

dom.jqPlayerOpacitySlider.change( function() {
	api.video.opacity( this.value );
});

})();
