app.factory("helper", function(){
	var self = {};

	//useful constants
	self.hostName = "http://localhost:3000";
	//queue
	self.queue = async.queue(function (task, callback) {
	    var data = task(callback);
	}, 5);

	return self;
});