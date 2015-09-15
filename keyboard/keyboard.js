/*
	playerAPI
		.addKeys(
			"ctrl+o"
		)
	;
*/

(function() {

var
	i,
	ctrl, shift, alt, key,
	shortcuts = [],
	keysCodes = {
		ENTER: 13,
		LEFT: 37,
		TOP: 38,
		RIGHT: 39,
		BOTTOM: 40
	}
;

// Add the F1, F2, ..., F12 keys
for ( i = 0; i < 12; ++i ) {
	keysCodes[ "F" + ( i + 1 ) ] = 112 + i;
}

$.extend( playerAPI, {
	addKeys: function( keys, fn ) {
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
						key = that.length === 1
							? that.charCodeAt( 0 )
							: keysCodes[ that ]
						;
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
		return this;
	}
});

playerAPI.jqDocument
	.keydown( function( e ) {
		for ( var sc, i = 0; sc = shortcuts[ i ]; ++i ) {
			if (
				sc.key === e.keyCode &&
				sc.ctrl === e.ctrlKey &&
				sc.shift === e.shiftKey &&
				sc.alt === e.altKey
			) {
				return sc.fn();
			}
		}
	})
;

})();
