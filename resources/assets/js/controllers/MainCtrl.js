'use strict';

module.exports = ['$scope', '$window', 'authFactory', function($scope, $window, authFactory) {
	$scope.user = authFactory.getUser();

	authFactory.registerObserver(function (user) {
		$scope.user = user;
	});

	$scope.doLogout = function () {
		authFactory.logout()
			.then(function _then() {
				$window.location.hash = '/login';
			});
	};
}];