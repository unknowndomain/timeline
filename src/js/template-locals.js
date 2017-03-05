var config, apps = [];

function templateLocals( req, res, next ) {
	res.locals = config.globals;
	res.locals.loggedInUser = req.user;
	next();
};

module.exports = function( c, a ) {
	config = c;
	apps = a;
	return templateLocals;
}
