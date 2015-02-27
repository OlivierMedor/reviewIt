var app = angular.module('rateIt');

app.controller('searchResultsCtrl', function($scope, dashboardService){
	$scope.mostRecentResults = false;
	$scope.selectDisplayOfReviews = ['Recent reviews', 'Highest Rated Reviews'];
	dashboardService.getAllReviews().then(function(res){
		$scope.allReviews = res;
		 
	})
	$scope.$on('$viewAllContentLoaded', function() {
    $scope.getAllReviews();


});
	$scope.reviewsSortingFunction = function(){
		$scope.mostRecentResults = !$scope.mostRecentResults;
	}
	$scope.orderTo = 'stars';


$scope.reviewsSorting = 'Recent reviews';
})