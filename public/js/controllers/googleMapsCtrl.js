var app = angular.module('rateIt');
app.controller('newPlaceCtrl', function($scope, Map, $routeParams, dashboardService) {
    $scope.yourUsername = $routeParams.userId;
    $scope.getReviews = function(){
        dashboardService.getReview().then(function(res){
            console.log(res)
        })

    }

    
    
    $scope.place = {};
    $scope.formVar = true;
    $scope.search = function() {
     var newAutoCompleteVar = autocomplete.getPlace();
     console.log(newAutoCompleteVar);
     

        $scope.apiError = false;
        Map.search(newAutoCompleteVar.name + ', ' + newAutoCompleteVar.vicinity)
        .then(
            function(res) { // success
                console.log(res)
                $scope.formVar = false;
                Map.addMarker(res);
                $scope.place.name = res.name;
                $scope.place.vicinity = newAutoCompleteVar.vicinity;
                // $scope.place.lng = res.geometry.location.lng();
                var photos = res.photos;
                $scope.newphotos = photos[0].getUrl({'maxWidth': 150, 'maxHeight': 150});
                console.log($scope.newphotos);
                
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


