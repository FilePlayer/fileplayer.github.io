"use strict";

(function() {

var
	frameObj,
	canvasUsed,
	selectedVisu,
	arrayVisu = {},
	analyser = api.audio.analyser
;

if ( analyser ) {
	analyser.fftSize = 4096;
	frameObj = {
		analyser: analyser,
		data: new Uint8Array( analyser.frequencyBinCount )
	}
}

ui.visualizerIsOn = false;

ui.visualizerCanvas = function() {
	return ui.visualizerIsOn && canvasUsed.canvas;
};

ui.visualizerAdd = function( name, ctxType, fn ) {
	arrayVisu[ name ] = {
		ctxType: ctxType,
		frame: fn,
		jqLi: $( "<li>" + name + "</li>" )
			.appendTo( dom.ctrlVisualList )
			.click( ui.visualizerSelect.bind( null, name ) )
	};
	return ui;
};

ui.visualizerSelect = function( name ) {
	if ( selectedVisu !== arrayVisu[ name ] ) {
		if ( selectedVisu ) {
			selectedVisu.jqLi.removeClass( "selected" );
		}
		selectedVisu = arrayVisu[ name ];
		selectedVisu.jqLi.addClass( "selected" );
		var newCanvas = selectedVisu.ctxType === "2d" ? ui.canvas2d : ui.canvasWebgl;
		if ( canvasUsed !== newCanvas ) {
			if ( canvasUsed ) {
				canvasUsed.toggle( false );
			}
			canvasUsed = newCanvas;
		}
		canvasUsed.render( selectedVisu.frame, frameObj );
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
		canvasUsed.toggle( b );
	}
	dom.ctrlVisualBtn.toggleClass( "disable", !b );
	dom.ctrlVisualCheckbox.attr( "checked", b ? "checked" : null );
	ui.visualizerIsOn = b;
	return ui;
};

})();
