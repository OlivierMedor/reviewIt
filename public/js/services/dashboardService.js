var app = angular.module('rateIt');

app.service('dashboardService', function($http, $q, $location){
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
	this.postReview = function(companyName, address, title, yourReview, stars) {
		var deferred = $q.defer();
		$http({
			method: 'POST',
			url: '/api/post-review',
			data: {
				companyName: companyName,
				address: address,
				title: title,
				yourReview: yourReview,
				stars: stars

			}
		}).then(function(response){
			deferred.resolve(response);

		})
		return deferred.promise;
	}
	this.getAllReviews = function(){
		var deferred = $q.defer();
		$http({
			method: 'GET',
			url: '/api/show-reviews'
		}).then(function(res){
			deferred.resolve(res.data);
		})
		return deferred.promise;
	}
	this.checkAuthenticate = function(){
    var deferred = $q.defer();
    $http({
      method: 'GET',
      url: '/api/check-status'
    }).then(function(res){
      console.log(res)
      deferred.resolve(res.data);
    }, function(){
    	swal({   
    		title: "Error!",   
    		text: "You need to be logged in!",   
    		type: "error",   
    		confirmButtonText: "Ok" });
    	$location.path('/login');
    })
    return deferred.promise;
  }
})