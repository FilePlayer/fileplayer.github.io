"use strict";

(function() {

// Opera 8.0+
window.isOpera = ( !!window.opr && !!opr.addons ) || !!window.opera || navigator.userAgent.indexOf( ' OPR/' ) >= 0;
// Firefox 1.0+
window.isFirefox = typeof InstallTrigger !== 'undefined';
// At least Safari 3+: "[object HTMLElementConstructor]"
window.isSafari = Object.prototype.toString.call( window.HTMLElement ).indexOf( 'Constructor' ) > 0;
// Internet Explorer 6-11
window.isIE = /*@cc_on!@*/false || !!document.documentMode;
// Edge 20+
window.isEdge = !isIE && !!window.StyleMedia;
// Chrome 1+
window.isChrome = !!window.chrome && !!window.chrome.webstore;
// Blink engine detection
window.isBlink = ( isChrome || isOpera ) && !!window.CSS;

window.utils = {
	secondsToString: function( sec ) {
		// 3600 -> "1:00:00"
		//   60 ->   "01:00"
		var
			s = ~~( sec % 60 ),
			m = ~~( sec / 60 ) % 60,
			h = ~~( sec / 3600 )
		;
		if ( s < 10 ) { s = "0" + s; }
		if ( m < 10 ) { m = "0" + m; }
		return (
			( h ? h + ":" : "" ) +
			m + ":" + s
		);
	},
	range: function( a, val, b, ori ) {
		var valn = +val;
		if ( arguments.length === 4 && val[ 1 ] === "=" ) {
			valn =
				( ori || 0 ) +
				+val.substr( 2 ) * ( val[ 0 ] + "1" )
			;
		}
		return Math.min( Math.max( a, valn ), b );
	},
	fPercent: function( n ) {
		return Math.round( n * 100 ) + " %";
	}
};

})();
