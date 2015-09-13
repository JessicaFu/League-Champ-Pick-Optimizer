var port = process.env.PORT || 3000;

//setup middleware
var app = require("./init/middleware")();

//setup server side routing
var routes = require("./init/serverRoutes")();
app.use("/", routes);

app.locals.basedir = __dirname;

//start server
var server = app.listen(port, function () {
  var host = server.address().address
  var port = server.address().port

  console.log("League Smart Match listening at http://%s:%s", host, port)
});
