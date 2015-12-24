(function() {

var
	that,
	width,
	showing,
	showTimeout,
	hideTimeout,
	jqPlaylist = dom.jqPlaylist,
	jqToggleBtn = dom.jqPlaylistToggleBtn,
	jqPlaylistList = dom.jqPlaylistList,
	minWidth = 150 //parseFloat( jqPlaylist.css( "minWidth" ) )
;

window.playlistUI = that = {
	isShow: function() {
		return showing;
	},
	show: function() {
		clearTimeout( hideTimeout );
		showing = true;
		jqPlaylist.addClass( "showing" );
		showTimeout = setTimeout( function() {
			jqPlaylist.addClass( "show" );
			api.video.resizeUpdate();
		}, 350 );
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
		hideTimeout = setTimeout( api.video.resizeUpdate , 350 );
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
			api.video.resizeUpdate();
		}
		return that;
	},
	append: function( nodeFile ) {
		var data = nodeFile.data;

		data.jqElem =
		$(
			"<a class='file' href='#'>" +
				"<i class='fa fa-fw fa-" +
					( data.type === "audio" ? "music" : "film" ) +
				"'></i>" +
				"<span>" + data.name + "</span>" +
			"</a>"
		)
			.click( function() {
				api.playlist.select( nodeFile );
				return false;
			})
			.appendTo( jqPlaylistList )
		;
		return that;
	},
	highlight: function( fileWrapper, b ) {
		fileWrapper.jqElem.toggleClass( "selected", b );
		return that;
	}
};

that
	.hide()
	.width( 350 )
;

})();
