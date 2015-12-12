'use strict';

var $ = require('jquery');

module.exports = function($scope, $http, $q) {
	$scope.tasks = [];
	$scope.task = '';
	$scope.editingState = {};
	var taskField = $('#new-todo');

	$http.get('/api/1.0/task')
		.then(function _then(res) {
			$scope.tasks = res.data
		})
		.catch(function _catch(error) {
			console.log(error);
		})
		.finally(function _finally() {
			taskField.focus();
		});

	function editTask(task, newTask) {
		$http.put('/api/1.0/task/' + task.id, newTask)
			.then(function _then(res) {
				for (var prop in newTask) {
					task[prop] = newTask[prop];
				}
			})
			.catch(function _catch(error) {
				console.log(error);
			});
	}

	$scope.createTask = function () {
		if ($scope.task.trim()) {
			$http.post('/api/1.0/task', { description: $scope.task })
				.then(function _then(res) {
					$scope.tasks.push(res.data);
				})
				.catch(function _catch(error) {
					console.log(error);
				})
				.finally(function _finally() {
					taskField.focus();
					task = '';
				});
		}
	};

	$scope.completeTask = function(task) {
		editTask(task, { completed_at: new Date() });
	};

	$scope.restoreTask = function(task) {
		editTask(task, { completed_at: null });
	}

	$scope.deleteTask = function(task) {
		$http.delete('/api/1.0/task/' + task.id)
			.then(function _then(res) {
				var idx = $scope.tasks.indexOf(task);
				if (idx !== -1) {
					$scope.tasks.splice(idx, 1);
				}
			})
			.catch(function _catch(error) {
				console.log(error);
			});
	};
};