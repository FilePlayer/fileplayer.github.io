(function(){

var
	jqVideo = dom.jqPlayerVideo,
	jqRotation = dom.jqPlayerRotationIcon
;

function getRotationDegrees( obj ) {
	var matrix = obj.css( "transform" );

	if( matrix !== 'none' ) {
		var
			values =
				matrix
					.split( '(' )[ 1 ]
					.split( ')' )[ 0 ]
					.split( ',' )
			,
			a = values[ 0 ],
			b = values[ 1 ],
			angle = Math.round( Math.atan2( b, a ) * ( 180 / Math.PI ) )
		;
	} else { var angle = 0; }
	//return (angle < 0) ? angle + 360 : angle;
	return angle;
}

function rotate( degree ) {
	var rotation = getRotationDegrees( jqVideo );

	jqVideo.css( { transform: "rotate(" + ( rotation + degree ) + "deg)" } );
}



jqRotation.click( function() { rotate( 45 ); } );

})();
