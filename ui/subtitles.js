"use strict";

(function() {

var
	currentCue,
	jqSubtitlesCueParent = dom.screenCue.parent()
;

$.extend( ui, {
	subtitlesResizeUpdate: function() {
		var
			imgW = api.video.width,
			btm = ( api.screen.height - api.video.height ) / 2
		;
		jqSubtitlesCueParent
			.toggleClass( "isUnderCtrl", btm < 80 ) // 80: dom.ctrl.outerHeight()
			.css({
				bottom: btm,
				fontSize: Math.max( 10, imgW / 100 * 2.5 ) + "px"
			})
		;
		return ui;
	},
	subtitlesToggle: function( b ) {
		ui.subtitlesCue( b
			? api.subtitles.findCue()
			: null
		);
		dom.ctrlSubtitlesBtn.toggleClass( "disable", !b );
		dom.ctrlSubtitlesCheckbox.attr( "checked", b ? "checked" : null );
		return ui;
	},
	subtitlesCue: function( cue ) {
		if ( cue !== currentCue ) {
			if ( currentCue = cue ) {
				dom.screenCue.html( cue.text );
			} else {
				dom.screenCue.empty();
			}
		}
		return ui;
	},
	subtitlesDelay: function( delay ) {
		return ui
			.actionDesc( "Subtitles delay : " + delay.toFixed( 3 ) + " s" )
			.subtitlesCue( api.subtitles.findCue() );
		;
	}
});

})();
