/*
Here, the representation of a video.textTracks:

video = {
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
	that,
	enable,
	textTrack,
	currentCue,
	cuesCopies,
	cuesDelay = 0,
	jqCue = dom.jqPlayerCue,
	jqSubtitlesActivator = $( ".menu.subtitles .menu-activator", dom.jqPlayerCtrl )
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
		for ( ; i < cuesLen; ++i ) {
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

api.subtitles = that = {
	isEnable: function() {
		return enable;
	},
	enable: function() {
		enable = true;
		jqSubtitlesActivator.attr( "data-tooltip-content", "Disable subtitles" );
		return that.update();
	},
	disable: function() {
		enable = false;
		currentCue = null;
		jqCue.empty();
		jqSubtitlesActivator.attr( "data-tooltip-content", "Enable subtitles" );
		return that;
	},
	toggle: function( b ) {
		if ( arguments.length === 0 ) {
			b = !enable;
		}
		return b ? that.enable() : that.disable();
	},
	select: function( track ) {
		if ( !arguments.length ) {
			return textTrack;
		}
		textTrack = track;
		initCuesMap( track.cues );
		return that.update();
	},
	update: function() {
		if ( enable ) {
			var cue = findCue( api.video.currentTime() + cuesDelay );
			if ( cue !== currentCue ) {
				if ( currentCue = cue ) {
					jqCue.html( cue.text );
				} else {
					jqCue.empty();
				}
			}
		}
		return that;
	},
	delay: function( sec ) {
		if ( !arguments.length ) {
			return cuesDelay;
		}
		cuesDelay = utils.range( -Infinity, sec, +Infinity, cuesDelay );
		api.shortcutDesc( "Subtitles delay : " + cuesDelay.toFixed( 3 ) + " s" );
		return that.update();
	}
};

that.disable();

})();
