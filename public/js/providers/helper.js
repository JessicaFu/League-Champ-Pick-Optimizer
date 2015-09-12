app.factory("helper", function(){
	var self = {};

	//useful constants
	self.hostName = "http://localhost:3000";
	self.apiUrl = "http://localhost:3000/api";
	self.recAddedCount = 6;

	//item categories
	self.household = {
		table: 0,
		seating: 0,
		bedding: 0,
		appliances: 0,
		decor: 0
	};

	self.apparel = {
		women: 0,
		men: 0,
		shirts: 0,
		pants: 0,
		dresses: 0,
		skirts: 0,
		shoes: 0,
		accesories: 0 
	}

	self.electronics = {
		calculators: 0,
		computers: 0
	}

	//queue
	self.queue = async.queue(function (task, callback) {
	    var data = task(callback);
	}, 5);

	return self;
});