(function() {

function list() {
	this.first
	this.last = null;
	this.length = 0;
	this.circular( false );
}

list.prototype = {
	pushBack: function( obj ) {
		var node = {
			data: obj
		};
		if ( !this.length ) {
			node.prev =
			node.next = this.isCircular ? node : null;
			this.first = node;
		} else {
			node.prev = this.last;
			node.next = this.isCircular ? this.first : null;
			this.last.next = node;
		}
		this.last = node;
		++this.length;
		return node;
	},
	circular: function( b ) {
		this.isCircular = b;
		if ( this.length ) {
			if ( b ) {
				this.last.next = this.first;
				this.first.prev = this.last;
			} else {
				this.last.next =
				this.first.prev = null;
			}
		}
	}
};

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
	list: function() {
		return new list();
	}
};

})();
