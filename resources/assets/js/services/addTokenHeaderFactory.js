'use strict';

module.exports = ['storageFactory', function(storageFactory) {
	return {
		request: function _requestConfig (config) {
			config.headers['Auth-token'] = storageFactory.get('auth_token');
			return config;
		}
	};
}];