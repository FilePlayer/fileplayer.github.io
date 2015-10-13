(function() {

var
	jqVideo = dom.jqPlayerVideo,
	jqBtn = $( ".btn.opacity", dom.jqPlayerCtrl ),
	jqIcon = $( ".fa", jqBtn ),
	jqElement_cuteSlider = $( ".cuteSlider", jqBtn ),
	jqCuteSliderContainer = jqElement_cuteSlider.parent(),
	opacity
;

function setOpacity( o ) {
	opacity = utils.range( 0, o, 1 );
	jqVideo.css( "opacity", opacity );
	jqElement_cuteSlider.element().val( opacity );
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
