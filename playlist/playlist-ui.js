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
	push: function( name ) {
		var
			jqPlaylistFile = jqPlaylistContent.children(),
			jqNewFile = $( "<a>" )
		;

		jqPlaylistFile.removeClass( "selected" );

		jqNewFile
			.addClass( "item selected" )
			.text( name )
			.click( { selectId: api.playlist.currId }, function( e ) {
				jqPlaylistContent.children().removeClass( "selected" );
				jqNewFile.addClass( "selected" );
				api.video
					.load( api.playlist.files[ e.data.selectId ].url )
					.play()
				;
				api.playlist.currId = e.data.selectId;
			})
			.appendTo( jqPlaylistContent )
		;
		return that;
	}
};

that
	.hide()
	.width( 350 )
;

})();
