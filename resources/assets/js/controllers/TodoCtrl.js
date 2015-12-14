'use strict';

module.exports = function($scope, $http, $window, $browser) {
	$scope.tasks = [];
	$scope.task = '';
	$scope.editingState = {};
	var taskField = $window.document.getElementById('new-todo');

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

	function editTask(task, updates) {
		return $http.put('/api/1.0/task/' + task.id, updates)
			.then(function _then(res) {
				for (var prop in res.data) {
					task[prop] = res.data[prop];
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
	};

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

	$scope.showEditForm = function(taskId) {
		$scope.editingState[taskId] = true;
		$browser.defer(function _defer() {
			var el = window.document.getElementById('edit-todo-' + taskId);
			el.setSelectionRange(0, el.value.length);
			el.focus();
		});
	};

	$scope.hideEditForm = function(task, isUpdated) {
		if (isUpdated) {
			editTask(task, { description: $window.document.getElementById('edit-todo-' + task.id).value })
				.then(function _then() {
					$scope.editingState[task.id] = false;
				})
				.catch(function _catch(error) {
					console.log(error);
				});
		} else {
			$scope.editingState[task.id] = false;
		}
	};
};