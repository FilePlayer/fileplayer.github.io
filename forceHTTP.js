"use strict";

if ( location.protocol === "https:" ) {
	location = "http" + location.href.substr( 5 );
}
