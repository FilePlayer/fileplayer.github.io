api.audio.addVisu(
	"Oscilloscope",
	function( info ) {
		var
			y,
			i = 0,
			ctx = info.ctxCanvas,
			w = ctx.canvas.width,
			h = ctx.canvas.height,
			dat = info.data,
			len = dat.length,
			scaling = 1.5,
			base = info.analyser.frequencyBinCount / 8,
			mult = w / len
		;

		info.analyser.getByteTimeDomainData( dat );
		ctx.save();
		ctx.translate( 0, h / 2 );
			ctx.beginPath();

				ctx.moveTo( 0, 0 );
				for ( ; i < len; ++i ) {
					y = ( 128 - dat[ i ] ) * scaling;

					// Pinch the extremities.
					if ( i < base ) {
						y = y / base * i;
					} else if ( i >= len - base ) {
						y = y / base * ( len - i );
					}
					ctx.lineTo( i * mult, y );
				}

			ctx.lineWidth = 1;
			ctx.strokeStyle = "#fff";
			ctx.stroke();
		ctx.restore();
	}
);

api.audio.selectVisu( "Oscilloscope" ); // Todo: remove this
