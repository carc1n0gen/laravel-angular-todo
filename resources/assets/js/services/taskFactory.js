'use strict';

module.exports = ['$http', function($http) {
	return {
		list: function() {
			return $http.get('/v1/task');
		},

		// find: function (id) {

		// },

		create: function (description) {
			return $http.post('/v1/task', { description: description });
		},

		update: function (id, updates) {
			return $http.put('/v1/task/' + id, updates);
		},

		delete: function(id) {
			return $http.delete('/v1/task/' + id);
		}
	};
}];