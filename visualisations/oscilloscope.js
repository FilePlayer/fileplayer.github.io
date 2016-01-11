(function() {

var
	max,
	PI2 = Math.PI / 2,
	pinchPerc = 1 / 8,
	HeightPerc = 1 / 4
;

api.audio.addVisu(
	"Oscilloscope",
	function( info ) {
		var
			dat,
			y,
			i = 0,
			ctx = info.ctxCanvas,
			w = ctx.canvas.width,
			h = ctx.canvas.height,
			data = info.data,
			len = data.length,
			base = len * pinchPerc,
			scaling = h * HeightPerc,
			mult = w / len
		;


		ctx.globalCompositeOperation = "source-in";
		ctx.fillStyle =
			"rgba(" +
				Math.round( 255 - max * 255 ) + "," +
				Math.round( max * 64 ) + "," +
				Math.round( max * 255 ) + "," +
				( .95 - .25 * ( 1 - Math.cos( max * PI2 ) ) ) +
			")"
		;
		ctx.fillRect( 0, 0, w, h );

		max = 0;
		info.analyser.getByteTimeDomainData( data );
		ctx.globalCompositeOperation = "source-over";
		ctx.save();
		ctx.translate( 0, h / 2 );
			ctx.beginPath();

				ctx.moveTo( 0, 0 );
				for ( ; i < len; ++i ) {
					dat = ( -128 + data[ i ] ) / 128;
					max = Math.max( Math.abs( dat ), max );
					y = dat * scaling;
					if ( i < base || i >= len - base ) {
						// Pinch the extremities.
						y *= .5 - Math.cos( ( i < base ? i : len - i ) / base * Math.PI ) / 2;
					}
					ctx.lineTo( i * mult, y );
				}

			ctx.lineJoin = "round";
			ctx.lineWidth = 1 + Math.round( 3 * max );
			ctx.strokeStyle = "#fff";
			ctx.stroke();
		ctx.restore();
	}
);

api.audio.selectVisu( "Oscilloscope" ); // Todo: remove this

})();
