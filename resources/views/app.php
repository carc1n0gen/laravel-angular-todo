<html>
	<head>
		<meta charset="utf-8">
		<title>Todo</title>
		<link href="css/app.css" rel="stylesheet" type="text/css">
	</head>
	<body>
		<div id="app"><todo-app></todo-app></div>
		<script>
			window.Laravel = <?= json_encode(['csrfToken' => csrf_token()]) ?>;
		</script>
		<script src="js/app.js"></script>
	</body>
</html>