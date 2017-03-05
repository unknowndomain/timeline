var	express = require( 'express' ),
	app = express();

var passport = require( 'passport' );

app.get( '/', function ( req, res ) {
	if ( req.isAuthenticated() ) {
		req.logout();
	} else {
	}
	res.redirect( '/' );
} );

module.exports = function( config ) { return app; };
