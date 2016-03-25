"use strict";

(function() {

var
	sceneCreated,
	canvas,
	canvasCtx,
	scene,
	renderer,
	camera,
	texture,
	sphere
;

function createScene() {
	// Scene, renderer:
	scene = new THREE.Scene();
	renderer = new THREE.WebGLRenderer( {
		canvas: ui.canvasWebgl.canvas,
		context: ui.canvasWebgl.ctx
	});

	// Camera:
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, .5, 2 );
	camera.rotation.y += -Math.PI / 2;
	scene.add( camera );

	// Sphere's texture:
	canvas = document.createElement( "canvas" );
	canvasCtx = canvas.getContext( "2d" );
	texture = new THREE.Texture( canvas );
	texture.minFilter = THREE.LinearFilter;
	
	// Sphere, texture:
	sphere = new THREE.Mesh(
		new THREE.SphereGeometry( 1, 32, 32, 0, Math.PI * 2, 0, Math.PI ),
		new THREE.MeshBasicMaterial({
			map: texture,
			overdraw: true,
			side: THREE.BackSide
		})
	);
	scene.add( sphere );
}

function frame( obj ) {
	// Update the renderer's dimensions:
	renderer.setSize( window.innerWidth, window.innerHeight );
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	// Sphere's texture:
	canvas.width = api.videoElement.videoWidth;
	canvas.height = api.videoElement.videoHeight;
	canvasCtx.save();
		canvasCtx.scale( -1, 1 );
			canvasCtx.drawImage( api.videoElement, -canvas.width, 0, canvas.width, canvas.height );
	canvasCtx.restore();	
	texture.needsUpdate = true;

	// Render:
	renderer.render( scene, camera );
}

ui.video360Enabled = false;
ui.video360Toggle = function( b ) {
	if ( typeof b !== "boolean" ) {
		b = !ui.video360Enabled;
	}
	ui.video360Enabled = b;
	if ( b ) {
		if ( !sceneCreated ) {
			createScene();
			sceneCreated = true;
		}
		ui.canvasWebgl.render( frame );
	}
	ui.canvasWebgl.toggle( b );
	dom.ctrl360Btn
		.removeClass( "fa-check-circle-o fa-circle-o" )
		.addClass( b ? "fa-check-circle-o" : "fa-circle-o" )
	;
	return ui;
};

})();