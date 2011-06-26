<!DOCTYPE html>
<html>
	<head>
		<meta name="viewport" content="initial-scale=1.0, user-scalable=no">
		<meta http-equiv="content-type" content="text/html; charset=utf-8">
		<title>
			Localizer
		</title>
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js"></script>
		<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>
		<script type="text/javascript" src="/scripts/main.js"></script>
		<script type="text/javascript" src="/scripts/map.js"></script>
		<script type="text/javascript" src="/scripts/login.js"></script>
		<script type="text/javascript" src="/scripts/search.js"></script>
		<link rel="stylesheet" type="text/css" href="/styles/reset.css" />
		<link rel="stylesheet" type="text/css" href="/styles/buttons.css" />
		<link rel="stylesheet" type="text/css" href="/styles/master.css" />
		<link href='http://fonts.googleapis.com/css?family=Jura:light,regular,500,600&v1' rel='stylesheet' type='text/css'>
	</head>
	
	<body>
		<section id="map">
			<div id="map_canvas"></div>
		</section>
		<section id="top-bar" class="shadow">
			<h1>The Localizer</h1>
			<nav> 
				<a href="/submit/">Submit</a>
				<a href="/respond/">Respond</a>
				<a href="/settings/">Settings</a>
			</nav>
			<section id="top-bar-search">
				<input id="search-input" type="text" results="5" name="search" size="large" placeholder="Search Archives" onKeyPress="doOnEnter(this, event, preformSearch)">
			</section>
		</section>
		<section id="bottom-bar" class="shadow">
			<h3>Click Anywhere to Create a Ping</h3>
			<footer>
				&copy; Team JCKG 2011
			</footer>
		</section>
		
		
		<section id="login-cover">
		</section>
		<section id="login" class="shadow">
			<section id="login-form" class="shadow">
				<div id="login-spacer">
					<header> 
						<h1>Login</h1><h3>or <a href="javascript:changeToRegister()">Join Localizer</a>
					</header>
				<form onSumbit="return false;"> 
					<label for="email">Username</label>
					<input type="text" id="username" name="username"/>
					<label for="password">Password</label>
					<input type="password" id="password" name="password" placehoder="Password" onKeyPress="doOnEnter(this, event, validateLogin)"/>
					<button class="clean-gray" type="button" name="login" onclick="validateLogin();">Login</button>
				</form>
				</div>
			</section>
		</section>
		
		<script>
			initializeMap();
		</script>
	</body>
</html>
