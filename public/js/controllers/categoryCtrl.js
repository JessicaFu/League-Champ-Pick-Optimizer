app.controller('categoryCtrl', function($scope, util){
	var cache = util.cache;
	var helper = util.helper;
	var apiGet = util.apiGet;

    $scope.items = cache.get("items") || [];;
    $scope.refineBy = helper.household;
    
    if ($scope.items.length === 0){
    	helper.queue.push(function(callback){
    		return util.apiGet("itemsBelow", {startId: 0, count: 100}, callback);
    	}, function(data){
	    	cache.add("items", data);
	    	$scope.items = data;
	    	$scope.$apply();
    	});
    }
});