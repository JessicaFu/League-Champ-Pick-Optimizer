app.controller('homeCtrl', function($scope, util){
	var cache = util.cache;
	var helper = util.helper;
	var apiGet = util.apiGet;

    $scope.recAdded = cache.get("recAdded") || [];

    if (recAdded.length === 0){
    	helper.queue.push(function(callback){
    		return util.apiGet("recAdded", {}, callback);
    	}, function(data){
	    	cache.add("recAdded", data);
	    	$scope.recAdded = data;
	    	$scope.$apply();
    	});
    }
});