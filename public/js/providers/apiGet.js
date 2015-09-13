app.factory('apiGet', function(helper) {
	return function(hostname, query){
		var url = hostname;
		if (Object.keys(query).length > 0){
			url += "?";
		}

		for(var key in query){
			url += key + "=" + query[key] + "&";
		}

		if (Object.keys(query).length > 0){
			//remove extra & symbol from query
			url = url.substring(0, url.length - 1); 
		}

		console.log(url);
		$.get(url, function(data, status){
			return data;
		});
	}
});