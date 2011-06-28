function startSubmit(){
	actionManager.onStartCreate($('#message-box'));
}

function submitForm(){
	
	
	actionManager.onSumbitCreate($('#question').attr('value'), $('select#cat').val(), createBox.getAnchor());
	
	google.maps.event.clearListeners(map, 'click');
	createBox.close();	
	
	
	setTimeout("actionManager.mapOnClickAddPing();", 500);
	
	return false;
}

function submitAnswer(){
	
	alert('reply will be sent');
	closeRespondTo();
}