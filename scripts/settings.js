var mbox_width, mbox_height, mbox_opacity, mbox_left, mbox_marginLeft;


function __settings_setup(){
	$('.user-changes input#fname').val(user.fname);
	$('.user-changes input#lname').val(user.lname);
	$('.user-changes input#email').val(user.email);
	$('.user-changes input#home').val(user.home_city);
	$('.user-changes input#distance').val(user.search_radius).change();
	$('#user-summary h1').html(user.username);
	console.log(user);
}

function openSettings(){
	$('#settings-underlay').fadeIn();
	$('#settings-underlay').click(function(){
		closeSettings();
	});
	
	
	mbox_width = $('#message-box').css('width');
	mbox_height = $('#message-box').css('height');
	mbox_opacity = $('#message-box').css('opacity');
	mbox_left = $('#message-box').css('left');
	mbox_marginLeft = $('#message-box').css('margin-left');
	
	$('#message-box').load('/ajax/settings.html', function(){__settings_setup();}).fadeOut('fast').css({
	    'width': "700px",
		'height': "500px",
		'left': "50%",
	    'marginLeft': "-350px"
	  }).fadeIn(500);
	$('#activity-box').fadeOut(500);
}

function closeSettings(){
	$('#settings-underlay').fadeOut();
	$('#activity-box').fadeIn(500);
	
	$('#message-box').fadeOut('normal',function(){$(this).css({
	    'width': '',
		'height': '',
		'left': '',
	    'margin-left': ''
	  });});
}