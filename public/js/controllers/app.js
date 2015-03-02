var app = angular.module('rateIt', ['ngRoute'])

app.config(function($routeProvider){
  

	$routeProvider
		 .when('/login',{
    templateUrl: 'templates/login.html',
    controller: 'mainCtrl'
  })
  .when('/dashboard/:userId', {
    templateUrl: 'templates/googleMapsView.html',
    controller: 'newPlaceCtrl',
    resolve: {
      loginRequired: function(dashboardService) { 
      return dashboardService.checkAuthenticate();
    
    }

  }

  })
  .when('/', {
    templateUrl: 'templates/search-results.html',
    controller: 'searchResultsCtrl',
    
  })
  .when('/register', {
    templateUrl: 'templates/register.html',
    controller: 'mainCtrl'
  })
  .otherwise({
   redirectTo: '/'
  });
})
  