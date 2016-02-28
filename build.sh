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
		tools/*.js \
		dom.js \
		api/main.js \
		`find api ui player playlist -name "*.js" -not -name "main.js"` \
		-o main.js \
		--compress \
		--mangle
fi
