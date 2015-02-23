var app = angular.module('rateIt');

app.controller('mainCtrl', function($scope, $location, LoginService){
	$scope.clickRegister = function() {
		LoginService.register($scope.username, $scope.password, $scope.email).then(function(data) {
			
			$scope.registerSuccessful = true;
			$location.path('dashboard/' + data.username);
		}).catch(function(err) {
			
			$scope.regError = true;
			
		});
	};

	$scope.login = function(){
		LoginService.login($scope.username, $scope.password).then(function(data) {
			
			$scope.registerSuccessful = true;
			$location.path('dashboard/' + $scope.username);
		})
	}
	

})


