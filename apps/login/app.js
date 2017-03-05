var	express = require( 'express' ),
	app = express();

var passport = require( 'passport' );

app.set( 'views', __dirname + '/views' );

app.get( '/', function ( req, res ) {
	if ( ! req.isAuthenticated() ) {
		res.render( 'index' );
	} else {
		res.redirect( '/' );
	}
} );

app.get( '/facebook', passport.authenticate( 'facebook' ) );

app.get( '/facebook_redirect', passport.authenticate( 'facebook', { failureRedirect: '/login' } ), function( req, res ) {
	res.redirect( '/' );
} );

module.exports = function( config ) { return app; };
