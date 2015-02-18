var app = angular.module('rateIt', ['ngRoute'])

app.config(function($routeProvider){
	$routeProvider
		 .when('/login',{
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })
  .when('/dashboard/:userId', {
    templateUrl: 'templates/mydashboard.html',
    controller: 'dashboardCtrl'
  })
  .when('/search-results', {
    templateUrl: 'templates/search-results.html',
    controller: 'searchResultsCtrl'
  })
  })