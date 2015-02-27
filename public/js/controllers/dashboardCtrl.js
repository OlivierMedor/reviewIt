var app = angular.module('rateIt');


app.controller('dashboardCtrl', function($scope, $routeParams, dashboardService){
	
$scope.$on('$viewallContentLoaded', function() {
    $scope.getAllReviews();

});

	console.log($routeParams.userId);
	$scope.getAllReviews = function(){
		dashboardService.getReview().then(function(res){
			console.log(res)
		})

	}


})
