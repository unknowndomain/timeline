var __home = __dirname + '/../..';
var __config = __home + '/config/config.json';
var __src = __home + '/src';
var __js = __src + '/js';

var config = require( __config );

var database = require( __js + '/database' ),
	Individuals = database.individuals.model;

var passport = require( 'passport' ),
	FacebookStrategy = require( 'passport-facebook' ).Strategy;

var Authentication = {
	auth: function( app ) {
		passport.use( new FacebookStrategy( {
			clientID: config.facebook.app_id,
			clientSecret: config.facebook.app_secret,
			callbackURL: config.facebook.redirect,
			profileFields: [ 'id', 'first_name', 'last_name' ]
		},
		function( accessToken, refreshToken, profile, done ) {
			Individuals.findOne( { facebook_id: profile.id }, function( err, user ) {
				if ( user == undefined ) {
					var new_user = {
						firstname: profile.name.givenName,
						lastname: profile.name.familyName,
						facebook_id: profile.id
					}
					Individuals.create( new_user, function( err, user ) {
						return done( err, user );
					} );
				} else {
					return done( err, user );
				}
			} )
		} ) )

		passport.serializeUser( function( data, done ) {
			done( null, data );
		} )

		passport.deserializeUser( function( data, done ) {
			Individuals.findById( data._id, function( err, user ) {
				if ( user != null ) {
					return done( null, user );
				} else {
					return done( null, false );
				}
			} );
		} )

		app.use( passport.initialize() )
		app.use( passport.session() )
	},
	loggedIn: function( req ) {
		if ( req.isAuthenticated() && req.user != undefined ) {
			return true;
		} else {
			return false;
		}
	},
	isLoggedIn: function( req, res, next ) {
		var status = Authentication.loggedIn( req );
		switch ( status ) {
			case true:
				return next();
			default:
			case false:
			//	if ( req.method == 'GET' ) req.session.requestedUrl = req.originalUrl;
			//	req.flash( 'error', "Please login" );
				res.redirect( '/login' );
				return;
		}
	}
}

module.exports = Authentication;
