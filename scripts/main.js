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
	if ( actionManager.state <= 1 ) {
		if ( actionManager.messageBox ) {
			actionManager.messageBox.children('.step.active').removeClass('active');
			$('section.step:nth-of-type(2)').addClass('active');
		}
	}
	actionManager.state++;
}

actionManager.onCategoryPick = function(){
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

actionManager.onSumbitCreate = function(){
	actionManager.state = 4;
	if ( actionManager.messageBox ) 
		actionManager.messageBox.fadeOut();
}