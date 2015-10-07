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
	enable,
	currentCue,
	cuesCopies,
	textTrack,
	cuesDelay = 0,
	textTracks = playerAPI.videoElement.textTracks,
	jqSubCtn = $( "#cues > *" ),
	jqBtnSubtitlesTooltip = $( ".menu-list-slidebtn", playerAPI.jqControls ),
	jqBtnSubtitles = $( ".menu.subtitles .slidebutton input", playerAPI.jqControls )
;

function initCuesMap( cues ) {
	if ( !textTrack.cuesMap ) {
		var
			cue,
			sA,
			sB,
			i = 0,
			cuesLen = cues.length,
			cuesMapLen = ~~cues[ cuesLen - 1 ].endTime + 1,
			cuesMap = new Array( cuesMapLen )
		;
		cuesCopies = new Array( cuesLen );
		textTrack.cuesMap = cuesMap;
		for ( i = 0; i < cuesLen; ++i ) {
			cue = cues[ i ];
			cuesCopies[ i ] = {
				id: +cue.id,
				startTime: cue.startTime,
				endTime: cue.endTime,
				text: "&nbsp;" + cue.text.replace( /\n/g, "&nbsp;<br/>&nbsp;" ) + "&nbsp;"
			};
			sA = ~~cue.startTime;
			sB = ~~cue.endTime;
			for ( ; sA <= sB; ++sA ) {
				if ( !cuesMap[ sA ] ) {
					cuesMap[ sA ] = cuesCopies[ i ];
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
			} while ( cue = cuesCopies[ cue.id ] );
		}
	}
}

$.extend( playerAPI, {
	subtitlesEnable: function( b ) {
		if ( !arguments.length ) {
			return enable;
		}
		if ( enable = b ) {
			this.subtitlesUpdate();
			jqBtnSubtitles.attr("checked", "checked");
		} else {
			jqSubCtn.empty();
			currentCue = null;
			jqBtnSubtitles.removeAttr("checked");
		}
		jqBtnSubtitlesTooltip
			// Update the mouse's helper.
			.attr( "data-tooltip-content", b ? "Disable subtitles" : "Enable subtitles" )
		;
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
		initCuesMap( textTrack.cues );
		return this.subtitlesUpdate();
	},
	subtitlesUpdate: function() {
		if ( enable ) {
			var cue = findCue( this.position() + cuesDelay );
			if ( cue !== currentCue ) {
				if ( currentCue = cue ) {
					jqSubCtn.html( cue.text );
				} else {
					jqSubCtn.empty();
				}
			}
		}
		return this;
	},
	subtitlesDelay: function( sec ) {
		if ( !arguments.length ) {
			return cuesDelay;
		}
		cuesDelay = utils.range( -Infinity, sec, +Infinity, cuesDelay );
		return this
			.subtitlesUpdate()
			.shortcutDesc(
				"Subtitles delay : " +
				Math.round( cuesDelay * 1000 )
				+ " ms"
			)
		;
	}
});

// Continue the initialisation by disable the subtitles by default.
playerAPI.subtitlesEnable( false );

})();
