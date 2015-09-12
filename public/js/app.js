var app = angular.module("LolApp", []);

app.service("util", function(cache, apiGet, helper) {
	this.cache = cache;
	this.apiGet = apiGet;
	this.helper = helper;
});
