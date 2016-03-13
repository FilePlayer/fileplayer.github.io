"use strict";

// Scroll the playlist's list to show the selected file.
// This function don't do anything if the selected file is already on screen.
// nbElemMargin: how many elements we want to show above or below the selected file.
ui.scrollToSelection = function() {
	var
		ok,
		top,
		height,
		topOnScr,
		childHeight,
		nbElemsMargin = 3.25,
		children = dom.playlistList.children( ".selected" )
	;

	if ( children.length ) {
		top = children.position().top;
		topOnScr = top - dom.playlistList[ 0 ].scrollTop;
		childHeight = children.outerHeight();
		if ( ok = topOnScr < 0 ) {
			top -= nbElemsMargin * childHeight;
		} else {
			height = dom.playlistList.height() - 50; // 50 -> $(".ctrl").height()
			if ( ok = topOnScr > height - childHeight ) {
				top -= height - ++nbElemsMargin * childHeight;
			}
		}
		if ( ok ) {
			dom.playlistList.stop().animate({
				scrollTop: top
			}, 250 );
		}
	}
	return ui;
};
