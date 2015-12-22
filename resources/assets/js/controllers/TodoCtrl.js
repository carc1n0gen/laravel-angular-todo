'use strict';

var moment = require('moment');

module.exports = ['$scope', '$window', '$browser', 'taskFactory', function($scope, $window, $browser, taskFactory) {
	$scope.tasks = [];
	$scope.task = '';
	$scope.editingState = {};
	var taskField = $window.document.getElementById('new-todo');

	taskFactory.list()
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
		return taskFactory.update(task.id, updates)
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
			taskFactory.create($scope.task)
				.then(function _then(res) {
					$scope.tasks.push(res.data);
				})
				.catch(function _catch(error) {
					console.log(error);
				})
				.finally(function _finally() {
					taskField.focus();
					$scope.task = '';
				});
		}
	};

	$scope.completeTask = function(task) {
		editTask(task, { completed_at: moment().format('YYYY-MM-DD h:mm:ss') });
	};

	$scope.restoreTask = function(task) {
		editTask(task, { completed_at: null });
	};

	$scope.deleteTask = function(task) {
		taskFactory.delete(task.id)
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
		var input = $window.document.getElementById('edit-todo-' + task.id);
		if (isUpdated) {
			editTask(task, { description: input.value })
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
}];