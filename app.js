var __home = __dirname;
var __config = __home + '/config/config.json';
var __static = __home + '/static';
var __src = __home + '/src';
var __apps = __home + '/apps';
var __views = __src + '/views';
var __js = __src + '/js';

var config = require( __config ),
	express = require( 'express' ),
	app = express(),
	server = require( 'http' ).Server( app ),
	database = require( __js + '/database' ).connect();

console.log( "Starting..." );

// Setup static route
app.use( express.static( __static ) );

// Setup PUG
app.set( 'views', __views );
app.set( 'view engine', 'pug' );
app.set( 'view cache', false );

// Error 404
app.get( '*', function( req, res ) {
	res.status( 404 );
	res.render( '404', { organisation: 'Timeline' } );
} );
console.log( "	Route: *" );

// Start server
var listener = server.listen( config.port ,config.host, function () {
	console.log( "Server started on: " + listener.address().address + ':' + listener.address().port );
} );
