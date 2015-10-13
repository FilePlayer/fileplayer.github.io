(function() {

var
	jqTxt = [
		dom.jqPlayerTitle,
		dom.jqPlayerShortcutDesc
	],
	timeoutIds = []
;

function show( i, txt ) {
	clearTimeout( timeoutIds[ i ] );

	jqTxt[ i ]
		.text( txt )
		.removeClass( "hidden" )
	;

	// Start to fadeout the element after 2s.
	timeoutIds[ i ] = setTimeout( function() {
		jqTxt[ i ].addClass( "hidden" );
	}, 2000 );

	return api;
}

$.extend( api, {
	showTitle: show.bind( null, 0 ),
	shortcutDesc: show.bind( null, 1 )
});

})();
