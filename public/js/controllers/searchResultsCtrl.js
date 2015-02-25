var app = angular.module('rateIt');

app.controller('searchResultsCtrl', function($scope, dashboardService){
	dashboardService.getAllReviews().then(function(res){
		console.log(res);
	})
	$scope.$on('$viewAllContentLoaded', function() {
    $scope.getAllReviews();

});


})