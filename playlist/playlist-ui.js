(function() {

var
	that,
	width,
	showing,
	showTimeout,
	jqPlaylist = dom.jqPlaylist,
	jqToggleBtn = dom.jqPlaylistToggleBtn,
	jqPlaylistContent = dom.jqPlaylistContent,
	minWidth = 150 //parseFloat( jqPlaylist.css( "minWidth" ) )
;

window.playlistUI = that = {
	isShow: function() {
		return showing;
	},
	show: function() {
		showing = true;
		jqPlaylist.addClass( "showing" );
		showTimeout = setTimeout( function() {
			jqPlaylist.addClass( "show" );
		}, 300 );
		jqToggleBtn
			.removeClass( "fa-caret-square-o-left" )
			.addClass( "fa-caret-square-o-right" )
		;
		jqToggleBtn[ 0 ].dataset.tooltipContent = "Hide playlist";
		return that.width( width );
	},
	hide: function() {
		clearTimeout( showTimeout );
		jqPlaylist.removeClass( "show showing" );
		jqToggleBtn
			.removeClass( "fa-caret-square-o-right" )
			.addClass( "fa-caret-square-o-left" )
		;
		jqToggleBtn[ 0 ].dataset.tooltipContent = "Show playlist";
		that.width( 0 );
		showing = false;
		return that;
	},
	showToggle: function( b ) {
		if ( typeof b !== "boolean" ) {
			b = !showing;
		}
		return b ? that.show() : that.hide();
	},
	width: function( w ) {
		if ( arguments.length === 0 ) {
			return width;
		}
		if ( w ) {
			width = w = Math.max( w, minWidth );
		}
		if ( showing ) {
			jqPlaylist.css( "width", w );
		}
		return that;
	},
	addItem: function( name ) {
		var
			jqPlaylistItems = jqPlaylistContent.children(),
			currId = jqPlaylistItems.length,
			jqNewItem = $( "<div>" )
		;

		jqPlaylistItems.removeClass( "selected" );

		jqNewItem
			.attr({
				id: "item" + currId,
				class: "item selected",
			})
			.text( name )
			.click( function() {
				playlistUI.selectItem( this, currId );
			})
			.appendTo( jqPlaylistContent )
		;
		return that;
	},
	selectItem: function( elem, id ) {
		jqPlaylistContent.children().removeClass( "selected" );
		$( elem ).addClass( "selected" );
		api.playlist.load( id );
		return that;
	}
};

that
	.hide()
	.width( 350 )
;

})();
