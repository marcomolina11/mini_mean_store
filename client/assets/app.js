var app = angular.module('app', ['ngRoute', 'ngCookies']);

app.config(function($routeProvider){
	$routeProvider
	.when('/users', {
		templateUrl: 'partials/users.html',
		controller: 'usersController'
	})
	.otherwise({
		redirectTo: '/'
	})
})