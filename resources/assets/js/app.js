'use strict';

window.$ = window.jQuery = require('jquery');
var bootstrap = require('bootstrap-sass');
var angular = require('angular');
var angularRoute = require('angular-route');
var app = angular.module('todoApp', ['ngRoute']);

app.config(['$httpProvider', function ($httpProvider) {
	$httpProvider.interceptors.push('addTokenHeaderFactory');
	$httpProvider.interceptors.push('authFailedFactory');
}]);

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/register', {
			templateUrl: 'views/pages/register.html',
			controller: 'RegisterCtrl'
		})
		.when('/login', {
			templateUrl: 'views/pages/login.html',
			controller: 'LoginCtrl'
		})
		.when('/', {
			templateUrl: 'views/pages/todo.html',
			controller: 'TodoCtrl'
		})
		.when('/not-found', {
			templateUrl: 'views/pages/404.html'
		})
		.otherwise({
			redirectTo: '/not-found'
		});
}])

require('./services');
require('./directives');
require('./controllers');