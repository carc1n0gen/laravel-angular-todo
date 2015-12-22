'use strict';

module.exports = ['$scope', '$window', 'authFactory', function($scope, $window, authFactory) {
	$scope.email = null;
	$scope.password = null;
	$scope.errorMsg = '';

	$scope.attemptLogin = function () {
		$scope.errorMsg = '';

		authFactory.login($scope.email, $scope.password)
			.then(function _then() {
				$window.location.hash = '/';
			})
			.catch(function _catch(error) {
				$scope.errorMsg = error.data;
			});
	};
}];