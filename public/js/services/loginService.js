var app = angular.module('rateIt');

app.service('LoginService', function($q, $http) {
	this.register = function(username, password, email) {
		
		var deferred = $q.defer();
		$http({
			method: 'POST',
			url: '/api/register',
			data: {
				username: username,
				password: password,
				email: email
			}
		}).then(function(response) {
			deferred.resolve(response.data);
		});
		return deferred.promise;
	}

	this.login = function(username, password){
		var deferred = $q.defer();
		$http({
			method: 'POST',
			url: '/api/auth',
			data: {
				username: username,
				password: password
			}
		}).then(function(response){
			deferred.resolve(response.data);
		})
		.catch(function(err) {
			console.log("error logging in");
			deferred.reject(err);
		});
		return deferred.promise;
	}
})