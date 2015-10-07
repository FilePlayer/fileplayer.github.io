(function() {

var
	jqTxt = $( "#titleFile, #shortcutDesc" ),
	timeoutIds = []
;

function show( i, txt ) {
	clearTimeout( timeoutIds[ i ] );

	jqTxt.eq( i )
		.text( txt )
		.removeClass( "hidden" )
	;

	// Start to fadeout the element after 2s.
	timeoutIds[ i ] = setTimeout( function() {
		jqTxt.eq( i ).addClass( "hidden" );
	}, 2000 );
}

$.extend( playerAPI, {
	showTitle: function( txt ) {
		show( 0, txt );
		return this;
	},
	shortcutDesc: function( txt ) {
		show( 1, txt );
		return this;
	}
});

})();
