<!DOCTYPE html>
<html lang="en" ng-app="todoApp">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<link rel="stylesheet" href="/css/app.css">
	<script src="/js/app.js"></script>
</head>
<body ng-controller="MainCtrl">
	<div class="container-fluid">
		<div class="col">
			<div class="col-md-4 col-md-offset-4">
				<nav class="navbar navbar-default">
					<div class="container-fluid">
						<div class="navbar-header">
							<a class="navbar-brand" href="/#/">TodoApp</a>
						</div>
						<ul class="nav navbar-nav navbar-right" ng-if="user">
							<li>
								<a class="glyphicon glyphicon-log-out" title="Logout" ng-click="doLogout()"></a>
							</li>
						</ul>
					</div>
				</nav>
				<main ng-view></main>
			</div>
		</div>
	</div>
</body>
</html>