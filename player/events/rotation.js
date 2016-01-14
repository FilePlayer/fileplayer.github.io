(function(){

dom.jqPlayerRotationSlider.change( function() {
	api.video.rotation( this.value );
});

})();
