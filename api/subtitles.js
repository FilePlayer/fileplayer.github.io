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
	textTrack,
	cuesCopies,
	enable = false,
	cuesDelay = 0,
	tracks = dom.jqPlayerVideo[ 0 ].textTracks,
	jqListSubtitles = dom.jqPlayerSubtitlesList
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

api.subtitles = that = {
	newTrack: function( file ) {
		var
			reader = new FileReader()
		;

		reader.onloadend = function () {
			var
				blob,
				fileContent = reader.result,
				tracksLen = tracks ? tracks.length : 0
			;

			fileContent = "WEBVTT\n\n" + fileContent
				// Delete special encoded characters then make VTT coding style
				.substr( fileContent.indexOf( "1" ) )
				// Replace "," in SRT files by "." in VTT files
				.replace( /(\d{2}),(\d{3})/g, "$1.$2" )
			;

			blob = new Blob( [ fileContent ], {
				type: "text/vtt",
				endings: "transparent"
			});

			blob.url = URL.createObjectURL( blob );

			$( "<track>", {
				kind: "subtitles",
				src: blob.url,
				srclang: "en",
				label: "Subtitles " + ( tracksLen + 1 ),
				name: file.name,
			})
				.appendTo( dom.jqPlayerVideo )
				.on( "load", ( function( len ) {
					return function( e ) {
						tracks[ len ].mode = "hidden";
						api.subtitles
							.select( tracks[ len ] )
							.enable( true )
						;
					};
				})( tracksLen ) )
			;

			jqListSubtitles.children().removeClass( "selected" );

			// Add file name in subtitles list
			$( "<li>", {
				text: file.name,
				"class": "selected"
			})
				.appendTo( jqListSubtitles )
				.click( ( function( id ) {
					return function () {
						api.subtitles.select( tracks[ id ] );
						jqListSubtitles.children().removeClass( "selected" );
						$( this ).addClass( "selected" );
					};
				})( tracksLen ) )
			;

			// Chrome will start loading the track only
			// after the `mode` attribute is set to "showing".
			// The `if` is necessary for Firefox.
			if ( tracks[ tracksLen ] ) {
				tracks[ tracksLen ].mode = "showing";
			}
		};

		reader.readAsText( file );

		return that;
	},
	isEnable: function() {
		return enable;
	},
	enable: function() {
		playerUI.subtitlesToggle( enable = true );
		return that;
	},
	disable: function() {
		playerUI.subtitlesToggle( enable = false );
		return that;
	},
	toggle: function( b ) {
		if ( typeof b !== "boolean" ) {
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
		playerUI.subtitlesCue( that.findCue() );
		return that;
	},
	findCue: function() {
		if ( enable && textTrack ) {
			var
				sec = api.video.currentTime() + cuesDelay,
				cue = textTrack.cuesMap[ ~~sec ]
			;
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
			return cue;
		}
	},
	delay: function( sec ) {
		if ( !arguments.length ) {
			return cuesDelay;
		}
		cuesDelay = utils.range( -Infinity, sec, +Infinity, cuesDelay );
		playerUI
			.actionDesc( "Subtitles delay : " + cuesDelay.toFixed( 3 ) + " s" )
			.subtitlesCue( that.findCue() );
		;
		return that;
	}
};

})();
