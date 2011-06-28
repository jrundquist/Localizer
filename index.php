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
		<link rel="stylesheet" type="text/css" href="/styles/reset.css" />
		<link rel="stylesheet" type="text/css" href="/styles/buttons.css" />
		<link rel="stylesheet" type="text/css" href="/styles/master.css" />
		<link rel="stylesheet" type="text/css" href="/styles/messaging.css" />
		<link rel="stylesheet" type="text/css" href="/styles/dialogs.css" />
		<link href='http://fonts.googleapis.com/css?family=Jura:light,regular,500,600&v1' rel='stylesheet' type='text/css'>
		<script type="text/javascript" src="/scripts/create.js"></script>
		
		<script type="text/javascript" src="/scripts/actionManager.js"></script>
		<script type="text/javascript" src="/scripts/map.js"></script>
		<script type="text/javascript" src="/scripts/login.js"></script>
		<script type="text/javascript" src="/scripts/search.js"></script>
		<script type="text/javascript" src="/scripts/submit.js"></script>
		<script type="text/javascript" src="/scripts/settings.js"></script>
		<script type="text/javascript" src="/scripts/ping.js"></script>
		<script type="text/javascript" src="/scripts/main.js"></script>

		<!-- <script type="text/javascript" src="http://google-maps-utility-library-v3.googlecode.com/svn/tags/infobox/1.0/src/infobox_packed.js"></script> -->
	</head>
	
	<body>
		<section id="map">
			<div id="map_canvas">
				<div class="error">
					<h1>Location Permission Necessary</h1>
					<h3>The Localizer requires permission to access your location.</h3>
					<h3>This information is kept private and is never stored</h3>
				</div>
			</div>
		</section>
		<section id="top-bar" class="shadow">
			<h1>The Localizer</h1>
			<nav> 
				<a href="javascript:startSubmit();">Submit</a>
				<a href="/respond/">Respond</a>
				<a href="javascript:openSettings();">Settings</a>
			</nav>
			<section id="top-bar-search">
				<input id="search-input" type="text" results="5" name="search" size="large" placeholder="Search Archives" onKeyPress="doOnEnter(this, event, preformSearch)">
			</section>
		</section>
		<section id="bottom-bar" class="shadow">
			<h3 id="bottom-notes">Click Anywhere to Create a Ping</h3>

			<footer>
				<a href="javascript:doLogout();location.reload(true);">Logout</a>
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

		<div id="settings-underlay">
		</div>
		<div id="message-box" class="shadow"></div>
		<div id="activity-box" class="shadow">
			<header>Recent Activity</header>
			<section class="activity">
				<h1 class="create" onClick="(sentPingsList[0].addToMap(map).showDetails())"><script>document.write(sentPingsList[0].getText())</script></h1>
				<div class="info">
					<p>ping sent 2 minutes ago</p>
				</div>
			</section>
			<section class="activity">
				<h1 class="create" onClick="(sentPingsList[1].addToMap(map).showDetails())"><script>document.write(sentPingsList[1].getText())</script></h1>
				<div class="reply" onClick="(sentPingsList[1].addToMap(map).showDetails())"><script>document.write(sentPingsList[1].getResponses().length)</script> <small>new replies</small></div>
				<div class="info">
					<p>ping sent 1 day ago</p>
				</div>
			</section>
			<section class="activity">
				<h1 class="respond" onClick="(respondedToList[0].addToMap(map).showDetails())"><script>document.write(respondedToList[0].getText())</script></h1>
				<div class="info">
					<p>reply sent 3 days ago</p>
				</div>
			</section>
		</div>

		<script>
			login();
			initializeMap();
		</script>
		
		
	</body>
</html>
