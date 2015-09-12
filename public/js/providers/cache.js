app.factory('cache', function() {
	var self = this;
	var cache = {};

	function add(key, value){
		cache[key] = value;
	}
	self.add = add;

	function remove(key){
		if (key in cache){
			delete cache[key];
		}
	}
	self.remove = remove;

	function get(key, value){
		if (key in cache){
			return cache[key];
		}else if (value){
			add(key, value);
		}else {
			return null;
		}
	}
	self.get = get;

	return self;
 });