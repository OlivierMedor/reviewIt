var app = angular.module('rateIt');
app.controller('newPlaceCtrl', function($scope, Map, $routeParams, $location, $window, dashboardService) {


    
    $scope.checkForReview = function(){
        
        
        dashboardService.getAllReviews().then(function(res){
          

            $scope.hasBeenReviewed = [];
            for (var i = 0; i < res.length; i++) {

                if(res[i].companyName === $scope.place.name){

                 $scope.hasBeenReviewed.push(res[i]);
                 $scope.ifHasBeenReviewed = true;
                 

                    
                }
                

                


            };
           
            
            
            

        })
        

    }

    $scope.$on('$viewContentLoaded', function() {
    $scope.getReviews();
    dashboardService.checkAuthenticate().then(function(res){
        if(res.username !== $routeParams.userId){

            $location.path('/login');
            swal({   
            title: "Error!",   
            text: "You must login to your own dashboard",   
            type: "error",   
            confirmButtonText: "Ok" });

        }

    })

});

    $scope.postReviews = function(){
        //$scope.getReviews();
        sweetAlert({
  title: "Your Review",
  text: "Thank you for your review! Feel free to submit another review :-)",
  type: "success",
  confirmButtonColor: "#DD6B55",
  confirmButtonText: "OK",
  closeOnConfirm: true,
  html: false
}, function(){
  $window.location.reload()

});


        dashboardService.postReview($scope.place.name, $scope.place.vicinity, $scope.place.title, $scope.place.yourreview, $scope.newStarRating);
    }
    $scope.yourUsername = $routeParams.userId;
    $scope.getReviews = function(){
        dashboardService.getReview().then(function(res){
            $scope.allYourReviews = res


        })

    }

    
    
    $scope.place = {};
    $scope.formVar = true;
    $scope.search = function() {
     var newAutoCompleteVar = autocomplete.getPlace();
     
     
     

        $scope.apiError = false;
        Map.search(newAutoCompleteVar.name + ', ' + newAutoCompleteVar.vicinity)
        .then(
            function(res) { // success
                
                $scope.formVar = false;
                Map.addMarker(res);
                var photos = res.photos;
                if(photos){
                    $scope.newphotos = photos[0].getUrl({'maxWidth': 150, 'maxHeight': 150});
                     }
                $scope.place.name = res.name;
                $scope.checkForReview();
                
                $scope.place.vicinity = newAutoCompleteVar.vicinity;
                // $scope.place.lng = res.geometry.location.lng();
                var photos = res.photos;

                
            },
            function(status) { // error
                $scope.apiError = true;
                $scope.apiStatus = status;
            }
        );
    }
    $scope.starsRating = function(str){
        $scope.newStarRating = str;
        console.log($scope.newStarRating);

    }

    $scope.send = function() {
        $scope.postReviews();
                
        //console.log($scope.place.title + ' ' + $scope.place.name + ' ' + $scope.place.vicinity + ' ' + $scope.place.yourreview + ' ' +  $scope.newStarRating);
        
    }
    
    

    Map.init();
});


