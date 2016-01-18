"use strict";

(function() {

var
	that,
	width,
	showing,
	showTimeout,
	hideTimeout,
	jqPlaylist = dom.jqPlaylist,
	jqToggleBtn = dom.jqPlaylistToggleBtn,
	jqList = dom.jqPlaylistList,
	minWidth = 150 //parseFloat( jqPlaylist.css( "minWidth" ) )
;

window.playlistUI = that = {

	// Scroll the playlist's list to show the selected file.
	// This function don't do anything if the selected file is already on screen.
	// nbElemMargin: how many elements we want to show above or below the selected file.
	scrollToSelection: function() {
		var
			ok,
			top,
			height,
			topOnScr,
			childHeight,
			nbElemsMargin = 3.25,
			children = jqList.children( ".selected" )
		;
		if ( children.length ) {
			top = children.position().top;
			topOnScr = top - jqList[ 0 ].scrollTop;
			childHeight = children.outerHeight();
			if ( ok = topOnScr < 0 ) {
				top -= nbElemsMargin * childHeight;
			} else {
				height = jqList.height();
				if ( ok = topOnScr > height - childHeight ) {
					top -= height - ++nbElemsMargin * childHeight;
				}
			}
			if ( ok ) {
				jqList.stop().animate({
					scrollTop: top
				}, 250 );
			}
		}
		return that;
	},

	// Show or hide the playlist's container.
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
		jqToggleBtn[ 0 ].dataset.tooltipContent = "Hide playlist";
		return that.width( width );
	},
	hide: function() {
		clearTimeout( showTimeout );
		jqPlaylist.removeClass( "show showing" );
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

	// Set or get the width of the playlist's container.
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

	dragover: function( elem ) {
		if ( elem !== that.elFileDragover ) {
			if ( that.elFileDragover ) {
				that.elFileDragover.jqThis.removeClass( "dragover" );
			}
			that.elFileDragover = elem;
			if ( elem ) {
				elem.jqThis.addClass( "dragover" );
			}
		}
		return that;
	},

	// Create a new DOM element with events for the new file.
	addFiles: function( filesWrapper ) {
		var
			jqFiles,
			html = ""
		;

		$.each( filesWrapper, function() {
			html +=
				"<a class='file' href='#'>" +
					"<div class='content textOverflow'>"+
						"<i class='fa fa-fw fa-" +
							( this.type === "audio" ? "music" : "film" ) +
						"'></i>" +
						"<span>" + this.name + "</span>" +
					"</div>" +
				"</a>"
			;
		});

		jqFiles = $( html )
			.click( false )
			.dblclick( function() {
				api.playlist.select( this, "noscroll" );
				return false;
			})
			.each( function( i ) {
				filesWrapper[ i ].element = this;
				this.fileWrapper = filesWrapper[ i ];
				this.jqThis = $( this );
			})
		;

		if ( that.elFileDragover ) {
			jqFiles.insertBefore( that.elFileDragover );
			that.dragover( null );
		} else {
			jqFiles.appendTo( jqList );
		}
		return jqFiles;
	},

	// (Un)select a specific file in the playlist.
	highlight: function( jqFile, b ) {
		jqFile.toggleClass( "selected", b );
		return that;
	},

	shuffle: function( b ) {
		dom.jqPlaylistShuffle
			.toggleClass( "enable", b )
			.attr(
				"data-tooltip-content",
				"Shuffle " + "<i class='fa fa-toggle-" + ( b ? "on" : "off" ) + "'></i>"
			)
		;
		return that;
	},

	// Update of the repeat button.
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
