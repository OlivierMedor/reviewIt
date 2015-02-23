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

app.directive('googleplace', function() {
    return {
        require: 'ngModel',
        scope: {
            ngModel: '=',
            details: '=?'
        },
        link: function(scope, element, attrs, model) {
            var options = {
                types: [],
                componentRestrictions: {}
            };
            scope.gPlace = new google.maps.places.Autocomplete(element[0], options);
 
            google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
                scope.$apply(function() {
                    scope.details = scope.gPlace.getPlace();
                    model.$setViewValue(element.val());  
                    console.log(scope.details.geometry);            
                });
            });
        }
    };

});
//myApp.factory('myService', function() {});
 
function MyCtrl($scope) {
    $scope.gPlace;

}

