"use strict";

(function() {

var
	that,
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

api.visualisations = that = {
	enable: false,
	add: function( name, fn ) {
		visu[ name ] = fn;
		$( "<li data-name='" + name + "'>" + name + "</li>" )
			.appendTo( dom.ctrlVisualList )
			.click( that.select.bind( null, name ) )
		;
		return that;
	},
	select: function( name ) {
		if ( selectedVisu !== visu[ name ] ) {
			jqOldVisu.removeClass( "selected" );
			jqOldVisu = dom.ctrlVisualList.find( "[data-name='" + name + "']" ).addClass( "selected" );
			selectedVisu = visu[ name ];
			ui.canvasRender( selectedVisu, obj );
		}
		return that;
	},
	toggle: function( b ) {
		if ( typeof b !== "boolean" ) {
			b = !that.enable;
		}
		if ( b && !api.audio.ctx ) {
			b = false;
			api.error.throw( "WEBAUDIO" );
		}
		if ( api.video.type === "audio" ) {
			ui.canvasToggle( b );
		}
		ui.visualisationsToggle( b );
		that.enable = b;
		return that;
	}
};

})();