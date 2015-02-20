var app = angular.module('rateIt');

app.controller('mainCtrl', function($scope, $location, LoginService){
	$scope.clickRegister = function() {
		LoginService.register($scope.username, $scope.email, $scope.password).then(function(data) {
			console.log(data);
			$scope.registerSuccessful = true;
			$location.path('dashboard/' + data.username);
		}).catch(function(err) {
			
			$scope.regError = true;
			
		});
	};
	

})