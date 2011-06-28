function validateLogin(){
	// Reset all errors
	$('section#login input#password').removeClass('error');
	$('section#login input#username').removeClass('error');
	
	
	
	// Would actually do some validation
	if ( $('section#login input#username').val() == '' ){
		$('section#login input#username').addClass('error');
	}
	if ( $('section#login input#password').val() == '' ){
		$('section#login input#password').addClass('error');
	}
	
	if ( $('section#login input#password').hasClass('error') || $('section#login input#username').hasClass('error') ){
		return;
	}
	
	doLogin();
	
	$('#activity-box').fadeIn();
	$('section#login').addClass('out');
	$('section#login-cover').fadeOut('slow');
	
}
function checkLogin(){
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf('localizerLogin') == 0) return ('true'==c.substring(15,c.length));
	}
	return false;
}

function doLogin(){
	document.cookie = 'localizerLogin=true; expires=Wed, 1 Jan 2020 00:00:00 UTC; path=/;';
}

function doLogout(){
	document.cookie = 'localizerLogin=false; expires=Wed, 1 Jan 2020 00:00:00 UTC; path=/;';
}

function login(){
	if ( !checkLogin() ){
		return false;
	}else{
		$('#activity-box').show();
		$('section#login').hide().addClass('out');
		$('section#login-cover').hide().fadeOut('slow');
		return true;
	}
}



function doOnEnter(field, e, callback){
	var keycode;
	if (window.event) keycode = window.event.keyCode;
	else if (e) keycode = e.which;
	else return true;

	if (keycode == 13){
		callback();
		return false;
	}else{
		return true;
	}
}

