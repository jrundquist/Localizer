
var mbox_width, mbox_height, mbox_opacity, mbox_left, mbox_marginLeft;
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
	console.log(mbox_width, mbox_height, mbox_opacity, mbox_left, mbox_marginLeft);
	
	$('#message-box').load('/ajax/settings.html').fadeOut('fast').css({
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