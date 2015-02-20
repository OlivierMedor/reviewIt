var app = angular.module('rateIt');

app.service('dashboardService', function($http, $q){
	this.getReview = function(){
		var deferred = $q.defer();
		$http({
			method: 'GET',
			url: '/api/get-review'
		}).then(function(res){
			deferred.resolve(res.data);
		})
		return deferred.promise;
	}
})