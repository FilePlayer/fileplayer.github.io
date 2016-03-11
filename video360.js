(function() {

var
	that,
	video,
	canvas = document.createElement( 'canvas' ),
	ctxCanvas = canvas.getContext( '2d' ),
	scene = new THREE.Scene(),
	renderer = new THREE.WebGLRenderer( { antialias: true } ),
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ),
	texture = new THREE.Texture( canvas ),
	geometry = new THREE.SphereGeometry( 100, 32, 32, 0, Math.PI * 2, 0, Math.PI ),
	material = new THREE.MeshBasicMaterial({
		map: texture,
		overdraw: true,
		side:THREE.BackSide
	}),
	sphere = new THREE.Mesh( geometry, material )
;

video360 = that = {
	create: function( v ) {
		video = v;
		// FILEPLAYER : remove the previous line
		// Remove 'v' param 
		// Uncomment the line below
		// video = api.videoElement;

		// Renderer
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth, window.innerHeight );
		document.body.appendChild( renderer.domElement );

		// Camera
		camera.position.z = 20;
		camera.rotation.y += -Math.PI / 2;
		scene.add( camera );

		// Init Sphere video
		// Init video canvas
		canvas.width = 854;
		canvas.height = 480;
	
		ctxCanvas.fillStyle = '#0000ff';
		ctxCanvas.fillRect( 0, 0, canvas.width, canvas.height );

		// Init sphere texture ( associate with canvas )
		texture.minFilter = THREE.LinearFilter;
		texture.magFilter = THREE.LinearFilter;

		// Init sphere mesh
		sphere.position.set( 0, 0, 0 );
		scene.add( sphere );

		requestAnimationFrame( that.animate );
		return that;
	},
	animate: function() {
		function render() {
			if ( video.readyState === video.HAVE_ENOUGH_DATA ) {

				// Horizontally flip
				ctxCanvas.scale( -1, 1 );

				// Change texture and load the next video frame
				ctxCanvas.drawImage( video, -canvas.width, 0, canvas.width, canvas.height );

				if ( texture ) 
					texture.needsUpdate = true;
			}
			renderer.render( scene, camera );
		};

		render();
		requestAnimationFrame( that.animate );
		return that;
	}
};

})();
