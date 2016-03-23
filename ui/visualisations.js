"use strict";

(function() {

var
	obj,
	selectedVisu,
	visu = {},
	jqOldVisu = dom.empty,
	analyser = api.audio.analyser
;

if ( analyser ) {
	analyser.fftSize = 4096;
	obj = {
		analyser: analyser,
		data: new Uint8Array( analyser.frequencyBinCount )
	}
}

ui.visualizerIsOn = false;

ui.visualizerAdd = function( name, ctxType, fn ) {
	visu[ name ] = fn;
	$( "<li data-name='" + name + "'>" + name + "</li>" )
		.appendTo( dom.ctrlVisualList )
		.click( ui.visualizerSelect.bind( null, name ) )
	;
	return ui;
};

ui.visualizerSelect = function( name ) {
	if ( selectedVisu !== visu[ name ] ) {
		jqOldVisu.removeClass( "selected" );
		jqOldVisu = dom.ctrlVisualList
			.find( "[data-name='" + name + "']" )
			.addClass( "selected" )
		;
		selectedVisu = visu[ name ];
		ui.canvas2d.render( selectedVisu, obj );
	}
	return ui;
};

ui.visualizerToggle = function( b ) {
	if ( typeof b !== "boolean" ) {
		b = !ui.visualizerIsOn;
	}
	if ( b && !api.audio.ctx ) {
		b = false;
		api.error.throw( "WEBAUDIO" );
	}
	if ( api.video.type === "audio" ) {
		ui.canvas2d.toggle( b );
	}
	dom.ctrlVisualBtn.toggleClass( "disable", !b );
	dom.ctrlVisualCheckbox.attr( "checked", b ? "checked" : null );
	ui.visualizerIsOn = b;
	return ui;
};

})();
