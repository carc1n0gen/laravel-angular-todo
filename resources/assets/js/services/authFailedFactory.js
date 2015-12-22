'use strict';

module.exports = ['$q', '$window', '$injector', function($q, $window, $injector) {
	return {
		responseError: function _responseError (response) {
			if (response.status === 401) {
				$injector.get('authFactory').logout();
				$window.location.hash = '/login';
			}
			
			return $q.reject(response);
		}
	};
}];