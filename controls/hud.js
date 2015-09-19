(function() {

var
	jqTitle = $( "#titleFile" )
;

$.extend( playerAPI, {
	showTitle: function( title ) {
		jqTitle
			.text( title )
			.addClass( "visible" )
		;

		// Start to fadeout the title after 2s.
		setTimeout( function() {
			jqTitle.removeClass( "visible" );
		}, 2000 );

		return this;
	}
});

})();
