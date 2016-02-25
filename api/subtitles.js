"use strict";

(function() {

var
	that,
	currentCues,
	jqLiOld = dom.empty,
	enable = false,
	cuesDelay = 0
;

function parse( fileContent ) {
	var
		cue,
		sA,
		sB,
		map,
		i = 0,
		cues = [],
		cuesTmp = fileContent.split( /\s*\n\s*\n/ )
	;

	function getSec( s ) {
		var cut = s.split( ":" );
		cut[ 2 ] = +cut[ 2 ].replace( ",", "." );
		return cut[ 0 ] * 3600 + cut[ 1 ] * 60 + cut[ 2 ];
	}

	while ( cue = cuesTmp[ i++ ] ) {
		cue = /\d+.*\s+([\d:,.]+)\s*-->\s*([\d:,.]+).*\s+((.|\s)*)/.exec( cue );
		if ( cue ) {
			cues.push( {
				id: cues.length + 1,
				startTime: getSec( cue[ 1 ] ),
				endTime: getSec( cue[ 2 ] ),
				text: cue[ 3 ].replace( /\s*\n\s*/g, "<br>" )
			});
		}
	}

	cues.map = map = new Array( ~~cues[ cues.length - 1 ].endTime + 1 );
	for ( i = 0; cue = cues[ i ]; ++i ) {
		sA = ~~cue.startTime;
		sB = ~~cue.endTime;
		for ( ; sA <= sB; ++sA ) {
			if ( !map[ sA ] ) {
				map[ sA ] = cue;
			}
		}
	}

	return cues;
}

api.subtitles = that = {
	newTrack: function( fileWrapper ) {
		var reader = new FileReader();

		reader.onloadend = function () {
			var
				cues = parse( reader.result ),
				jqLi = $( "<li>" )
			;

			jqLi
				.text( fileWrapper.dataFile.name )
				.appendTo( dom.ctrlSubtitlesList )
				.click( function() {
					currentCues = cues;
					jqLiOld.removeClass( "selected" );
					jqLiOld = jqLi.addClass( "selected" );
					ui.subtitlesCue( that.findCue() );
					api.subtitles.enable();
				})
				.click()
			;
		};

		reader.readAsText( fileWrapper.dataFile );
		return that;
	},
	isEnable: function() {
		return enable;
	},
	enable: function() {
		ui.subtitlesToggle( enable = true );
		return that;
	},
	disable: function() {
		ui.subtitlesToggle( enable = false );
		return that;
	},
	toggle: function( b ) {
		if ( typeof b !== "boolean" ) {
			b = !enable;
		}
		return b ? that.enable() : that.disable();
	},
	findCue: function() {
		if ( enable && currentCues ) {
			var
				sec = api.video.currentTime() + cuesDelay,
				cue = currentCues.map[ ~~sec ]
			;
			if ( cue ) {
				do {
					if ( sec < cue.startTime ) {
						return;
					}
					if ( sec <= cue.endTime ) {
						return cue;
					}
				} while ( cue = currentCues[ cue.id ] );
			}
			return cue;
		}
	},
	delay: function( sec ) {
		if ( !arguments.length ) {
			return cuesDelay;
		}
		ui.subtitlesDelay(
			cuesDelay = utils.range( -Infinity, sec, +Infinity, cuesDelay )
		);
		return that;
	}
};

})();
