"use strict";

(function() {

var
	that,
	obj,
	enable = false,
	visu = {},
	jqOldVisu = dom.empty,
	selectedVisu = $.noop,
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
			selectedVisu = visu[ name ] || $.noop;
			jqOldVisu.removeClass( "selected" );
			jqOldVisu = dom.ctrlVisualList.find( "[data-name='" + name + "']" ).addClass( "selected" );
			if ( enable ) {
				that.toggle( true );
			}
		}
		return that;
	},
	toggle: function( b ) {
		if ( typeof b !== "boolean" ) {
			b = !enable;
		}
		if ( b && !api.audio.ctx ) {
			b = false;
			api.error.throw( "WEBAUDIO" );
		}
		ui
			.canvasToggle( b )
			.canvasRender( b && selectedVisu, obj )
			.visualisationsToggle( b )
		;
		enable = b;
		return that;
	}
};

})();