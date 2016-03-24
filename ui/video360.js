"use strict";

(function() {

var
	isReady,
	isEnable,

	canvas = document.createElement( "canvas" ),
	canvasCtx = canvas.getContext( "2d" ),

	scene = new THREE.Scene(),
	renderer = new THREE.WebGLRenderer( {
		canvas: ui.canvasWebgl.canvas,
		context: ui.canvasWebgl.ctx
	}),
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ),
	texture = new THREE.Texture( canvas ),
	sphere = new THREE.Mesh(
		new THREE.SphereGeometry( 100, 32, 32, 0, Math.PI * 2, 0, Math.PI ),
		new THREE.MeshBasicMaterial({
			map: texture,
			overdraw: true,
			side: THREE.BackSide
		})
	)
;

function createScene() {
	lg("create scene");

	// Camera
	// camera.position.set( 60, 60, 60 );
	camera.rotation.y += -Math.PI / 2;
	// camera.lookAt( scene.position );
	scene.add( camera );

	// var axes = new THREE.AxisHelper(100);
	// scene.add( axes );

	// Init Sphere video
	// Init video canvas
	canvas.width = 854;
	canvas.height = 480;

	// Init sphere texture ( associate with canvas )
	texture.minFilter = THREE.LinearFilter;

	// Init sphere mesh
	scene.add( sphere );
}

function frame( obj ) {
	lg("frame");
	
	renderer.setSize( window.innerWidth, window.innerHeight );
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	
	canvasCtx.save();
		canvasCtx.scale( -1, 1 );
			canvasCtx.drawImage( api.videoElement, -canvas.width, 0, canvas.width, canvas.height );
	canvasCtx.restore();
	
	texture.needsUpdate = true;
	renderer.render( scene, camera );
}

ui.video360Toggle = function( b ) {
	if ( typeof b !== "boolean" ) {
		b = !isEnable;
	}
	if ( b ) {
		if ( !isReady ) {
			createScene();
			isReady = true;
		}
		ui.canvasWebgl.render( frame );
	}
	ui.canvasWebgl.toggle( b );
	return ui;
};

})();