"use strict";

(function() {

var
	sceneCreated,
	scene,
	renderer,
	texture,
	sphere,
	camera,
	camVect
;

function createScene() {
	// Scene, renderer:
	scene = new THREE.Scene();
	renderer = new THREE.WebGLRenderer( {
		canvas: ui.canvasWebgl.canvas,
		context: ui.canvasWebgl.ctx
	});

	// Camera:
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, .001, 2 );
	camVect = new THREE.Vector3();
	scene.add( camera );

	// Sphere's texture:
	texture = new THREE.Texture();
	texture.minFilter = THREE.LinearFilter;
	
	// Sphere, texture:
	sphere = new THREE.Mesh(
		new THREE.SphereGeometry( 1, 32, 32, 0, Math.PI * 2, 0, Math.PI ),
		new THREE.MeshBasicMaterial( { map: texture } )
	);
	sphere.scale.x = -1;
	scene.add( sphere );
}

function frame( obj ) {
	if ( !ui.isSeeking ) {
		renderer.setSize( window.innerWidth, window.innerHeight );
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		texture.image = api.videoElement;
		texture.needsUpdate = true;
		renderer.render( scene, camera );
	}
}

// θ = longitude (gauche/droite) X
// φ = colatitude (haut/bas)     Y
// Axe +y = up
ui.video360LookAt = function( longX, colaY ) {
	ui.video360Longitude = longX;
	ui.video360Colatitude = colaY;
	var sinCol = Math.sin( colaY );
	camera.lookAt( camVect.set(
		Math.cos( longX ) * sinCol,
		Math.cos( colaY ),
		Math.sin( longX ) * sinCol
	));
	return ui;
};

ui.video360Mousemove = function( mx, my ) {
	return ui.video360LookAt(
		ui.video360Longitude - mx / ui.pxScreenWidth * Math.PI,
		utils.range(
			.001,
			ui.video360Colatitude - my / ui.pxScreenHeight * Math.PI,
			3.141
		)
	);
};

ui.video360Enabled = false;
ui.video360Toggle = function( b ) {
	if ( typeof b !== "boolean" ) {
		b = !ui.video360Enabled;
	}
	ui.video360Enabled = b;
	if ( b ) {
		var file = api.playlist.selectedFile();
		if ( !file || file.type !== "video" ) {
			b = false;
		}
	}
	if ( b ) {
		if ( !sceneCreated ) {
			createScene();
			sceneCreated = true;
		}
		ui.video360LookAt( 0, Math.PI / 2 );
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