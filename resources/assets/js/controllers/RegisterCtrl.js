'use strict';

module.exports = ['$scope', '$window', 'authFactory', function($scope, $window, authFactory) {
	$scope.name = null;
	$scope.email = null;
	$scope.password = null;
	$scope.errorMsg = '';

	$scope.attemptRegister = function () {
		$scope.errorMsg = '';

		authFactory.register($scope.name, $scope.email, $scope.password)
			.then(function _then() {
				$window.location.hash = '/login';
			})
			.catch(function _catch(error) {
				$scope.errorMsg = error.data;
			});
	};
}];