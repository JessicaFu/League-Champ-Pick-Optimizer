var app = angular.module("SoukApp", []);

app.service("util", function(cache, apiGet, helper) {
	this.cache = cache;
	this.apiGet = apiGet;
	this.helper = helper;
});
