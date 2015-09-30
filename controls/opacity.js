(function() {

var
	jqVideo = playerAPI.jqVideoElement,
	jqBtn = $( ".btn.opacity", playerAPI.jqControls ),
	jqIcon = $( ".fa", jqBtn ),
	jqElement_cuteSlider = $( ".cuteSlider", jqBtn ),
	jqCuteSliderContainer = jqElement_cuteSlider.parent(),
	opacity
;

function setOpacity( o ) {
	jqVideo.css( "opacity", opacity = o );
	jqIcon
		.removeClass( "fa-moon-o fa-lightbulb-o" )
		.addClass( opacity < .5 ? "fa-moon-o" : "fa-lightbulb-o" )
	;
	jqCuteSliderContainer.attr(
		"data-tooltip-content",
		"Brightness : " + Math.round( opacity * 100 ) + " %"
	);
}

jqElement_cuteSlider.change( function() {
	setOpacity( this.value );
});

setOpacity( 1 );

})();
