'use strict';

module.exports = ['$http', '$q', 'storageFactory', function($http, $q, storageFactory) {
	var user = storageFactory.get('user') || null;
	var observers = [];

	function notifyObservers() {
		for (var i = 0; i < observers.length; i++) {
			observers[i](user);
		}
	}

	return {
		register: function (name, email, password) {
			return $http.post('/v1/auth/register', { name: name, email: email, password: password });
		},

		login: function(email, password) {
			return $http.post('/v1/auth/login', { email: email, password: password })
				.then(function _then(res) {
					storageFactory.set('auth_token', res.data.auth_token);
					storageFactory.set('user', res.data.user);
					user = res.data.user;
					notifyObservers();
				});
		},

		logout: function() {
			return $q(function(resolve, reject) {
				storageFactory.clear();
				user = null;
				notifyObservers();

				resolve();
			});
		},

		getUser: function() {
			return user;
		},

		registerObserver: function(fn) {
			observers.push(fn);
		}
	};
}];