var app = angular.module('rateIt');

app.controller('mainCtrl', function($scope, Map, $location, LoginService){
	$scope.clickRegister = function() {
		LoginService.register($scope.username, $scope.password, $scope.email).then(function(data) {
			$scope.login();
			$scope.registerSuccessful = true;
			
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
	
Map.init();
})


