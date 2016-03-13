"use strict";

ui.bufferedDivs = [];
ui.bufferedDivsVisible = 0;

ui.buffered = function() {
	var
		i,
		divLen,
		jqDiv,
		dur = api.video.duration(),
		buff = api.videoElement.buffered,
		buffLen = buff.length
	;

	for ( i = buffLen - ui.bufferedDivs.length; i-- > 0;  )  {
		jqDiv = $( "<div class='buffer'>" ).hide();
		ui.bufferedDivs.push( { jqBuf: jqDiv } );
		dom.ctrlSliderPosTrack.append( jqDiv );
	}
	divLen = ui.bufferedDivs.length;

	if ( ui.bufferedDivsVisible !== buffLen ) {
		for ( i = 0; i < divLen; ++i )  {
			ui.bufferedDivs[ i ].jqBuf.toggle( i < buffLen );
		}
		ui.bufferedDivsVisible = buffLen;
	}

	for ( i = 0; i < buffLen; ++i )  {
		var
			a = buff.start( i ),
			b = buff.end( i ),
			buf = ui.bufferedDivs[ i ]
		;
		if ( buf.b !== b ) {
			buf.b = b;
			buf.jqBuf.css( {
				left: a / dur * 100 + "%",
				width: ( b - a ) / dur * 100 + "%"
			});
		}
	}
	return ui;
};
