"use strict";

(function() {

var jqList = dom.playlistList;

$.extend( ui, {

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
				height = jqList.height() - 50; // 50 -> $(".ctrl").height()
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
		return ui;
	}
});

})();
