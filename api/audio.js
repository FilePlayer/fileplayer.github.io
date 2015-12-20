(function() {

var
	ctx = new AudioContext(),
	src = ctx.createMediaElementSource( dom.jqPlayerVideo[ 0 ] )
;

src.connect( ctx.destination );

})();
