#!/bin/bash

# Build the big `style.css` file.
if [[ -z $1 || $1 == "css" ]]; then
	echo "Compressing CSS...";
	cd css;
	# Removing temporarely the Jekyll's frontmatter of the main SCSS file.
	tail -n +3 style.scss > _style.scss;
	sass _style.scss style.css;
	rm _style.scss;
	cd ..;
fi

# Build the big `script.js` file.
if [[ -z $1 || $1 == "js" ]]; then
	echo "Compressing JS...";
	uglifyjs \
		forceHTTP.js \
		tools/*.js \
		dom.js \
		main.js \
		api/*.js \
		api/thumbnail/*.js \
		ui/*.js \
		ui/updim/*.js \
		event/*.js \
		-o compressed.js \
		--compress \
		--mangle
fi
