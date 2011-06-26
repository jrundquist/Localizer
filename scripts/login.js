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
	//Logged in now
	$('section#login').addClass('out');
	$('section#login-cover').fadeOut('slow');
	
}