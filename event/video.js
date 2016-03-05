"use strict";

dom.screenVideo
.add( dom.screenVideoDistant )
	.on( {
		loadedmetadata: function() {
			api.fileLoaded();
			ui.loaded();
		},
		waiting: function() {
			ui.seeking();
		},
		seeked: function() {
			ui.seeked();
		},
		durationchange: function() {
			ui.duration( this.duration );
		},
		timeupdate: function() {
			ui
				.seeked()
				.currentTime( this.currentTime )
				.buffered()
			;
		},

		// What to do at the end of the file.
		// Note: the "loopOne" mode desn't have an end (cf: the loop attribute).
		ended: function() {
			var
				fwrap = api.playlist.selectedFile(),
				repeat = api.playlist.repeat()
			;
			if ( repeat === "loopAll" ||
				repeat === true && fwrap.element.jqThis.next().length
			) {
				api.playlist.next();
			} else {
				api.video.stop();
			}
		}
	})
;
