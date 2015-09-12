app.factory('apiGet', function(helper) {
	return function(type, query, callback){
		var url = "";

		switch(type){
			case "itemsAbove":
				url = helper.apiUrl + "/items/above/" + query.startId + "/" + query.count;
				break;
			case "itemsBelow":
				url = helper.apiUrl + "/items/below/" + query.startId + "/" + query.count;
				break;
			case "recAdded":
				url = helper.apiUrl + "/items/recent/" + helper.recAddedCount;
				break;
			default:
				return null;

			$.get(url, function(data, status){
				callback(data);
			});
		}
	}
});