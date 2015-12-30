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
	append: function( fileWrapper ) {
		var
			jqFile =
				$(
					"<a class='file textOverflow' href='#'>" +
						"<i class='fa fa-fw fa-" +
							( fileWrapper.type === "audio" ? "music" : "film" ) +
						"'></i>" +
						"<span>" + fileWrapper.name + "</span>" +
					"</a>"
				)
				.click( false )
				.dblclick( function() {
					api.playlist.select( this );
					return false;
				})
				.appendTo( jqPlaylistList )
		;

		jqFile[ 0 ].fileWrapper = fileWrapper;
		jqFile[ 0 ].jqThis = jqFile;
		return that;
	},
	highlight: function( jqFile, b ) {
		jqFile.toggleClass( "selected", b );
		return that;
	},
	playingMode: function( m ) {
		var dot = "<i class='repeatDot fa fa-circle'></i>";

		dom.jqPlaylistRepeat
			.removeClass( "disable one all" )
			.addClass(
				m === true ? "" :
				m === "loopOne" ? "one" :
				m === "loopAll" ? "all" : "disable"
			)
			.attr( "data-tooltip-content",
				"Playing mode&nbsp;:<br/><br/>" +
				( m === false ? dot : "" ) + "&nbsp;&nbsp;stop after file<br/>" +
				( m === true  ? dot : "" ) + "&nbsp;&nbsp;stop after playlist<br/>" +
				( m === "loopOne" ? dot : "" ) + "&nbsp;&nbsp;repeat one<br/>" +
				( m === "loopAll" ? dot : "" ) + "&nbsp;&nbsp;repeat playlist<br/>"
			)
		;
		return that;
	},
	currentIndex: function( n ) {
		dom.jqPlaylistNavIndex.text( n );
		return that;
	},
	totalFiles: function( n ) {
		dom.jqPlaylistNavTotal.text( n );
		return that;
	}
};

})();
