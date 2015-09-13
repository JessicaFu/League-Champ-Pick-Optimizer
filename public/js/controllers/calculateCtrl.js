app.controller('calculateCtrl', function($scope, util){
	var cache = util.cache;
	var helper = util.helper;
	var apiGet = util.apiGet;

    $scope.redTeam = [null, null, null, null, null];
    $scope.blueTeam = [null, null, null, null, null];

    $scope.champions = ["teemo", "annie"];

    $scope.calculate = function(){
		
    };
});