var __home = __dirname + '/../..';
var __config = __home + '/config/config.json';
var __src = __home + '/src';

var config = require( __config );

var mongoose = require( 'mongoose' )
var ObjectId = mongoose.Schema.ObjectId

exports.ObjectId = ObjectId
exports.mongoose = mongoose

exports.connect = function() {
	mongoose.connect( config.mongo );
	var db = mongoose.connection;
	db.on( 'connected', console.error.bind( console, 'Connected to Mongo database.' ) );
	db.on( 'error', console.error.bind( console, 'Error connecting to Mongo database.' ) );
	return exports;
}

// Events
exports.events = {}
exports.events.schema = mongoose.Schema( {
	_id: ObjectId,
	title: {
		type: String,
		required: true
	},
	slug: {
		type: String,
		unique: true,
		required: true
	},
	dates: {
		primary: {
			date: Date,
			accuracy: Number
		},
		secondary: {
			date: Date,
			accuracy: Number
		},
		single_date: Boolean,
		priority: Number
	},
	location: String,
	source: {
		type: ObjectId,
		ref: 'Entities'
	},
	media: [
		{
			type: String,
			url: String
		}
	],
	links: [
		{
			relationship: String,
			entity_id: {
				type: ObjectId,
				ref: 'Entities'
			},
			event_id: {
				type: ObjectId,
				ref: 'Events'
			},
			individual_id: {
				type: ObjectId,
				ref: 'Individuals'
			},
		}
	],
	created: Date,
	edited: Date
} )
exports.events.model = mongoose.model( 'Events', exports.events.schema )

// Series
exports.series = {};
exports.series.schema = mongoose.Schema( {
	_id: ObjectId,
	title: {
		type: String,
		required: true
	},
	slug: {
		type: String,
		required: true,
		unique: true
	},
	entity: {
		type: ObjectId,
		ref: 'Events'
	},
	individual: {
		type: ObjectId,
		ref: 'Individual'
	},
	events: [
		{
			classification: String,
			event: {
				type: ObjectId,
				ref: 'Events'
			}
		}
	],
	created: Date,
	edited: Date
} );
exports.series.model = mongoose.model( 'Series', exports.series.schema )

// Entities
exports.entities = {};
exports.entities.schema = mongoose.Schema( {
	_id: ObjectId,
	name: {
		type: String,
		required: true
	},
	slug: {
		type: String,
		required: true,
		unique: true
	},
	description: String,
	type: String,
	subtype: String,
	image: String,
	url: String,
	location: String,
	primary_event: {
		type: ObjectId,
		ref: 'Events'
	},
	created: Date,
	edited: Date
} );
exports.entities.model = mongoose.model( 'Entities', exports.entities.schema )

// Individuals
exports.individuals = {};
exports.individuals.schema = mongoose.Schema( {
	_id: ObjectId,
	slug: {
		type: String,
		required: true,
		unique: true
	},
	firstname: String,
	lastname: String,
	email: String,
	url: String,
	twitter: String,
	facebook: String,
	created: Date,
	edited: Date
} );
exports.individuals.model = mongoose.model( 'Individuals', exports.individuals.schema )
