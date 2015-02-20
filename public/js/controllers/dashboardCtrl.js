var app = angular.module('rateIt');


app.controller('dashboardCtrl', function($scope, $routeParams, dashboardService){
	console.log($routeParams.userId);
	$scope.getReviews = function(){
		dashboardService.getReview().then(function(res){
			console.log(res)
		})

	}


})
