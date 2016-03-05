"use strict";

(function() {

var
	jqDivArr = [],
	nbBuffVisibles = 0
;

// dom.ctrlSliderPosTrack.append( "<div class='buffer'>" );

$.extend( ui, {
	buffered: function() {
		var
			i,
			divLen,
			jqDiv,
			dur = api.video.duration(),
			buff = api.videoElement.buffered,
			buffLen = buff.length
		;

		for ( i = buffLen - jqDivArr.length; i-- > 0;  )  {
			jqDiv = $( "<div class='buffer'>" ).hide();
			jqDivArr.push( { jqBuf: jqDiv } );
			dom.ctrlSliderPosTrack.append( jqDiv );
		}
		divLen = jqDivArr.length;

		if ( nbBuffVisibles !== buffLen ) {
			for ( i = 0; i < divLen; ++i )  {
				jqDivArr[ i ].jqBuf.toggle( i < buffLen );
			}
			nbBuffVisibles = buffLen;
		}

		for ( i = 0; i < buffLen; ++i )  {
			var
				a = buff.start( i ),
				b = buff.end( i ),
				buf = jqDivArr[ i ]
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
	}
});

})();
