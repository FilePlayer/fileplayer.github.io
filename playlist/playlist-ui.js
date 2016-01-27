"use strict";

(function() {

var
	that,
	width,
	showing,
	showTimeout,
	hideTimeout,
	detachTimeout,
	jqPlaylist = dom.jqPlaylist,
	jqToggleBtn = dom.jqPlaylistToggleBtn,
	jqList = dom.jqPlaylistList,
	minWidth = 150 //parseFloat( jqPlaylist.css( "minWidth" ) )
;

window.playlistUI = that = {

	updateList: function() {
		that.jqFiles = dom.jqPlaylistList.children();
		return that;
	},
	updateFileHeight: function() {
		that.fileHeight = Math.max(
			that.jqFiles.outerHeight(),
			that.jqFiles.eq( 1 ).outerHeight()
		) - 1;
		return that;
	},
	updateTotal: function() {
		dom.jqPlaylistNavTotal.text( that.jqFiles.length );
		return that;
	},
	updateIndex: function() {
		dom.jqPlaylistNavIndex.text( 1 + that.jqFiles.index( that.jqFileSelected ) );
		return that;
	},
	// (Un)select a specific file in the playlist.
	highlight: function( jqFile, b ) {
		that.jqFileSelected = jqFile.toggleClass( "selected", b );
		return that;
	},

	detach: function( jqFile ) {
		if ( jqFile ) {
			jqFile.addClass( "dragging" );
			// callback to the end of the CSS's animation.
			detachTimeout = setTimeout( function() {
				jqFile.detach();
				that.updateList();
			}, 200 );
		}
		return that;
	},
	reattach: function( jqFile ) {
		playlistUI.addFiles( jqFile );
		clearTimeout( detachTimeout );
		setTimeout( function() {
			jqFile.removeClass( "dragging" );
		}, 1 );
		return that;
	},

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

	jqDragover: dom.jqPlaylistList,
	dragover: function( jqElem ) {
		if ( jqElem !== that.jqDragover ) {
			if ( that.jqDragover ) {
				that.jqDragover.removeClass( "dragover" );
			}
			if ( jqElem === dom.jqPlayer ) {
				var
					jq,
					sel = api.playlist.selectedFile()
				;
				if ( sel ) {
					sel = sel.element.jqThis.next();
					if ( sel.length ) {
						jq = sel[ 0 ].jqThis;
					}
				}
				jqElem = jq || dom.jqPlaylistList;
			}
			that.jqDragover = jqElem;
			if ( jqElem ) {
				jqElem.addClass( "dragover" );
			}
		}
		return that;
	},

	// Create a new DOM element with events for the new file.
	addFiles: function( filesWrapper ) {
		var
			jqFiles = filesWrapper,
			html = ""
		;

		if ( !filesWrapper.jquery ) {
			$.each( filesWrapper, function() {
				html +=
					"<a class='file' href='#' draggable='true'>" +
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
		}

		if ( that.jqDragover === dom.jqPlaylistList ) {
			jqFiles.appendTo( jqList );
		} else if ( that.jqDragover ) {
			jqFiles.insertBefore( that.jqDragover );
		}

		that
			.dragover( null )
			.updateList()
		;
		return jqFiles;
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
	}
};

})();
