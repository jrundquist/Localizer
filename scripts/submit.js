function startSubmit(){
	actionManager.onStartCreate($('#message-box'));
}

function submitForm(){
	// Do saving of form now
	//createMarker.setMap(null);
	
	google.maps.event.clearListeners(map, 'click');
	createBox.close();	
	
	// Show dialog confirming sent message
	
	actionManager.onSumbitCreate();
	setTimeout("actionManager.mapOnClickAddPing();", 500);
	
	return false;
}