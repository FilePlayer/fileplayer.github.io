(function() {

var
	that,
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
	create: function() {
		// Renderer
		document.body.appendChild( renderer.domElement );

		// Camera
		camera.rotation.y += -Math.PI / 2;
		scene.add( camera );

		// Init Sphere video
		// Init video canvas
		canvas.width = 854;
		canvas.height = 480;

		// Init sphere texture ( associate with canvas )
		texture.minFilter = THREE.LinearFilter;

		// Init sphere mesh
		scene.add( sphere );

		requestAnimationFrame( that.animate );
		return that;
	},
	animate: function() {
		// Horizontally flip
		ctxCanvas.scale( -1, 1 );

		// Change texture and load the next video frame
		ctxCanvas.drawImage( video, -canvas.width, 0, canvas.width, canvas.height );
		texture.needsUpdate = true;
		renderer.render( scene, camera );
		requestAnimationFrame( that.animate );
		return that;
	}
};

})();
