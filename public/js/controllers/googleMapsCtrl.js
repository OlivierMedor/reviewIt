var app = angular.module('rateIt');
app.controller('newPlaceCtrl', function($scope, Map) {
    
    
    $scope.place = {};
    $scope.formVar = true;
    $scope.search = function() {
     var newAutoCompleteVar = autocomplete.getPlace();
     console.log(newAutoCompleteVar);

        $scope.apiError = false;
        Map.search($scope.searchPlace)
        .then(
            function(res) { // success
                console.log(res)
                $scope.formVar = false;
                Map.addMarker(res);
                $scope.place.name = res.name;
                $scope.place.vicinity = res.vicinity;
                $scope.place.lng = res.geometry.location.lng();
                
            },
            function(status) { // error
                $scope.apiError = true;
                $scope.apiStatus = status;
            }
        );
    }
    
    $scope.send = function() {
       
        alert($scope.place.name + ' : ' + $scope.place.lat + ', ' + $scope.place.lng);    
    }
    

    Map.init();
});


