(function() {

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
