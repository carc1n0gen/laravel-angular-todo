<!DOCTYPE html>
<html lang="en" ng-app="TodoApp">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<link rel="stylesheet" href="/css/app.css">
	<script src="/js/app.js"></script>
</head>
<body>
	<div class="container-fluid">
		<br>
		<main ng-controller="TodoCtrl">
			<div class="row">
				<div class="col-md-6 col-md-offset-3">
					<form ng-submit="createTask()">
						<div class="row">
							<div class="col-xs-8 col-sm-9">
								<div class="form-group">
									<label for="new-todo" class="sr-only">New Task</label>
									<input id="new-todo" class="form-control" type="text" ng-model="task">
								</div>
							</div>
							<div class="col-xs-4 col-sm-3">
								<button type="submit" id="create-task" class="btn btn-success btn-block"><span class="glyphicon glyphicon-plus"></span>New Task</button>
							</div>
						</div>
					</form>
				</div>
			</div>
			<div class="row">
				<div class="col-md-6 col-md-offset-3">
					<div class="panel panel-default">
						<div class="panel-heading">
							Todo
						</div>
						<div class="panel-body">
							<ul class="list-group">
								<li class="list-group-item" ng-repeat="task in tasks | filter: { completed_at: '!' }">
									<div class="row">
										<div class="col-sm-8">
											<span ng-bind="task.description" ng-click="editingState[task.id] = true" ng-blur="editingState[task.id] = false" ng-hide="editingState[task.id]"></span>
											<form id="editing-task-@{{ task.id }}" class="form-inline" ng-show="editingState[task.id]">
												<div class="form-group">
													<label for="new-todo" class="sr-only">New Task</label>
													<input id="new-todo" class="form-control" type="text" ng-bind="task.description">
												</div>
											</form>
										</div>
										<div class="col-sm-4">
											<button class="danger glyphicon glyphicon-remove pull-right" title="Delete" ng-click="deleteTask(task)"></button>
											<button class="success glyphicon glyphicon-ok pull-right" title="Complete" ng-click="completeTask(task)"></button>
										</div>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		
			<div class="row">
				<div class="col-md-6 col-md-offset-3">
					<div class="panel panel-default">
						<div class="panel-heading">
							Completed
						</div>
						<div class="panel-body">
							<ul class="list-group">
								<li class="list-group-item" ng-repeat="task in tasks | filter: { completed_at: '' }">
									<span ng-bind="task.description"></span>
									<button class="danger glyphicon glyphicon-remove pull-right" title="Delete" ng-click="deleteTask(task)"></button>
									<button class="primary glyphicon glyphicon-refresh pull-right" title="Restore" ng-click="restoreTask(task)"></button>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</main>
	</div>
</body>
</html>