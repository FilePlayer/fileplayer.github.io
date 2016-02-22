"use strict";

(function() {

// Browser detection (where feature detection is not possible)
// http://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
window.isOpera = ( !!window.opr && !!opr.addons ) || !!window.opera || navigator.userAgent.indexOf( " OPR/" ) >= 0;
window.isFirefox = typeof InstallTrigger !== "undefined";
window.isSafari = Object.prototype.toString.call( window.HTMLElement ).indexOf( "Constructor" ) > 0;
window.isIE = /*@cc_on!@*/false || !!document.documentMode;
window.isEdge = !isIE && !!window.StyleMedia;
window.isChrome = !!window.chrome && !!window.chrome.webstore;
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
		if ( val.length && val[ 1 ] === "=" ) {
			valn = ( ori || 0 ) + val.substr( 2 ) * ( val[ 0 ] + "1" );
		}
		return Math.min( Math.max( a, valn ), b );
	},
	fPercent: function( n ) {
		return Math.round( n * 100 ) + " %";
	}
};

})();
