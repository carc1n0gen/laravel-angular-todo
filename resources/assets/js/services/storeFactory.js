'use strict';

module.exports = ['$window', function($window) {
	return {
		get: function _get(key) {
			return $window.localStorage.getItem(key);
		},

		set: function _set(key, val) {
			return $window.localStorage.setItem(key, val);
		},

		remove: function _remove(key) {
			$window.localStorage.removeItem(key);
		},

		has: function _has(key) {
			return $window.localStorage.get(key) !== null;
		},

		clear: function _clear() {
			$window.localStorage.clear();
		}
	};
}];