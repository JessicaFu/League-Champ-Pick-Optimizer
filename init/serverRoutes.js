function init(){
	var express = require("express");
	var router = express.Router();

	/* GET home page. */
	router.get('/', function(req, res, next) {
		res.render('index', {
			title: 'Brown Shib Test',
			user: req.isAuthenticated() ? req.user : null
		});
	});

	return router;
}
module.exports = init;
