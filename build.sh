#!/bin/bash

# Build the big `style.css` file
# Here we are removing temporarely the Jekyll's frontmatter of the SCSS file.
cd css;
cp style.scss _style.scss;
tail -n +3 _style.scss > style.scss;
sass style.scss style.css;
rm style.scss;
mv _style.scss style.scss;
