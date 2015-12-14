'use strict';

var angular = require('angular');
var angularRoute = require('angular-route');
var app = angular.module('todoApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider
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