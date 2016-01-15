"use strict";

(function() {

var
	that,
	i,
	ctrl, shift, alt, key,
	shortcuts = [],
	keysCodes = {
		ENTER: 13,
		LEFT: 37,
		UP: 38,
		RIGHT: 39,
		DOWN: 40,
		PLUS: 107,
		MINUS: 109
	}
;

// Add the F1, F2, ..., F12 keys
for ( i = 0; i < 12; ++i ) {
	keysCodes[ "F" + ( i + 1 ) ] = 112 + i;
}

api.keyboard = that = {
	shortcut: function( keys, fn ) {
		ctrl = shift = alt = false;
		keys
			.toUpperCase()
			.split( "+" )
			.forEach( function( that ) {
				switch ( that ) {
					case "CTRL"  : ctrl  = true; break;
					case "SHIFT" : shift = true; break;
					case "ALT"   : alt   = true; break;
					default :
						key = keysCodes[ that ] || that.charCodeAt( 0 );
					break;
				}
			})
		;
		shortcuts.push( {
			ctrl: ctrl,
			shift: shift,
			alt: alt,
			key: key,
			fn: fn
		});
		return that;
	}
};

dom.jqDoc.keydown( function( e ) {
	for ( var sc, i = 0; sc = shortcuts[ i ]; ++i ) {
		if (
			sc.key === e.keyCode &&
			sc.ctrl === ( e.ctrlKey || e.metaKey ) &&
			sc.shift === e.shiftKey &&
			sc.alt === e.altKey
		) {
			sc.fn();
			return false;
		}
	}
});

})();
