var port = process.env.PORT || 3000;

//setup middleware
var app = require("./init/middleware")();

//setup mySQL connection
var dbConnect = require("./init/dbConnect");
dbConnect.init();
var query = dbConnect.query;

//setup server side routing
var routes = require("./init/serverRoutes")();
app.use("/", routes);

//set up RESTFUL api
var api = require("./init/apiRoutes")(query);
app.use("/api", api);

app.locals.basedir = __dirname;

//start server
var server = app.listen(port, function () {
  var host = server.address().address
  var port = server.address().port

  console.log("League Smart Match listening at http://%s:%s", host, port)
});
