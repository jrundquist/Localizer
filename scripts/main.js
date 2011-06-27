
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




var actionManager = function(){
}

actionManager.mapOnClickAddPing = function(){
	/// Add the click handler
	google.maps.event.addListener(map, 'click', function(event) {
		if (createMarker) createMarker.setMap(null);
		placeMarker(event.latLng);
		showCreateWindow(createMarker);
		actionManager.onMapClick();
  	});
}

actionManager.onStartCreate = function(messageBox){

	actionManager.state = 1;
	actionManager.messageBox = messageBox;
	actionManager.messageBox.load('ajax/create.html');
	actionManager.messageBox.fadeIn();
}


actionManager.onMapClick = function(){
	actionManager.state = 2;
	if ( actionManager.messageBox ) {
		actionManager.messageBox.children('.step.active').removeClass('active');
		$('section.step:nth-of-type(2)').addClass('active');
	}
}

actionManager.onCategoryPick = function(){
	$('select#cat').find('option[value=""]').remove(); 
	if ( actionManager.state <= 2 ) {
		if ( actionManager.messageBox ) {
			actionManager.messageBox.children('.step.active').removeClass('active')
			$('section.step:nth-of-type(3)').addClass('active');
		}	
	}
	actionManager.state++;
}

actionManager.onQuestionEnter = function(){
	if ( actionManager.state <= 3 ) {
		if ( actionManager.messageBox ) {
			actionManager.messageBox.children('.step.active').removeClass('active')
			$('section.step:nth-of-type(4)').addClass('active');
		}
	}
	actionManager.state++;
}

actionManager.onSumbitCreate = function(txt, cat){
	actionManager.state = 4;
	if ( actionManager.messageBox ) {
		actionManager.messageBox.fadeOut();
		console.log(createBox);
	}
	
	$('#activity-box section.activity:first').before('<section class="activity new" style="display:none">\
		<h1 class="create">'+txt+'</h1>\
		<div class="info">\
			<p>ping sent seconds ago</p>\
		</div>\
	</section>');
	$('#activity-box section.activity.new').slideDown().removeClass('new');
	
	
	$('#bottom-notes').html('Your Ping Has Been Sumbitted');
	$('#bottom-bar').addClass('hilight');
	setTimeout('$("#bottom-bar").removeClass("hilight")', 1000);
}
