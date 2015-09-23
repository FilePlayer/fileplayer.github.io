/*
Here, the representation of a videoElement.textTracks:

videoElement = {
	textTracks: [ {
		kind,          // "subtitles"
		mode,          // "disabled", hidden" or "showing"
		cues: [ {
			id,        // start to "1" and not 0.
			text,      // string
			startTime, // secondes
			endTime    // secondes
		}, ... ]
	}, ... ]
}
*/

(function() {

var
	textTrack,
	cues,
	currentCue,
	enable = false,
	textTracks = playerAPI.videoElement.textTracks,
	jqSubCtn = $( "#cues > *" ),
	jqBtnSubtitles = $( ".btn.subtitles", playerAPI.jqControls )
;

function initCuesMap() {
	if ( !textTrack.cuesMap ) {
		var
			cue,
			sA,
			sB,
			i = 0,
			cuesMapLen = ~~cues[ cues.length - 1 ].endTime + 1,
			cuesMap = new Array( cuesMapLen )
		;
		textTrack.cuesMap = cuesMap;
		for ( i = 0; cue = cues[ i ]; ++i ) {
			cue.text = "&nbsp;" + cue.text.replace( /\n/g, "&nbsp;<br/>&nbsp;" ) + "&nbsp;";
			sA = ~~cue.startTime;
			sB = ~~cue.endTime;
			for ( ; sA <= sB; ++sA ) {
				if ( !cuesMap[ sA ] ) {
					cuesMap[ sA ] = cue;
				}
			}
		}
	}
}

function findCue( sec ) {
	if ( textTrack ) {
		var cue = textTrack.cuesMap[ ~~sec ];
		if ( cue ) {
			do {
				if ( sec < cue.startTime ) {
					return;
				}
				if ( sec <= cue.endTime ) {
					return cue;
				}
			} while ( cue = cues[ +cue.id ] );
		}
	}
}

$.extend( playerAPI, {
	subtitlesEnable: function( b ) {
		if ( !arguments.length ) {
			return enable;
		}
		if ( enable = b ) {
			this.subtitlesUpdate( this.position() );
		} else {
			jqSubCtn.empty();
			currentCue = null;
		}
		jqBtnSubtitles.toggleClass( "disable", !b );
		return this;
	},
	subtitlesToggle: function() {
		return this.subtitlesEnable( !enable );
	},
	subtitlesSelect: function( ind ) {
		if ( !arguments.length ) {
			return textTrack;
		}
		textTrack = textTracks[ ind ];
		cues = textTrack.cues;
		initCuesMap();
		return this.subtitlesUpdate( this.position() );
	},
	subtitlesUpdate: function( sec ) {
		if ( enable ) {
			var cue = findCue( sec );
			if ( cue !== currentCue ) {
				if ( currentCue = cue ) {
					jqSubCtn.html( cue.text );
				} else {
					jqSubCtn.empty();
				}
			}
		}
		return this;
	}
});

})();
