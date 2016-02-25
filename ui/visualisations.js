"use strict";

$.extend( ui, {
	visualisationsToggle: function( b ) {
		dom.ctrlVisualBtn.toggleClass( "disable", !b );
		dom.ctrlVisualCheckbox.attr( "checked", b ? "checked" : null );
		return ui;
	}
});
