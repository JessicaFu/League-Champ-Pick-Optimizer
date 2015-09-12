function init(query){
	var express = require("express");
	var router = express.Router();

	//setup RESTFUL api
	require('./../apiRoutes/get')(router, query);
	require('./../apiRoutes/post')(router, query);
	require('./../apiRoutes/put')(router, query);
	require('./../apiRoutes/delete')(router, query);

	return router;

}
module.exports = init;