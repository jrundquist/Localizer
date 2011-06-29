var actionManager = function(){
}

actionManager.mapOnLoad = function(){
	for(var i=0; i<sentPingsList.length; i++){
		sentPingsList[i].addToMap(map);
	}
	for(var i=0; i<respondedToList.length; i++){
		respondedToList[i].addToMap(map);
	}
}

actionManager.mapOnClickAddPing = function(){
	/// Add the click handler
	actionManager.state = -1;
	google.maps.event.addListener(map, 'click', function(event) {
		actionManager.onMapClick(event);
  	});
}

actionManager.onStartCreate = function(messageBox, clicked){
	messageBox = messageBox || $('#message-box');
	actionManager.state = 1;
	actionManager.messageBox = messageBox;
	actionManager.messageBox.load('ajax/create.html', function(){ if (clicked){actionManager.onMapClick()}} );
	actionManager.messageBox.fadeIn();
}

actionManager.onStartRespond = function(messageBox, clicked, ping){
	messageBox = messageBox || $('#message-box');
	actionManager.state = 5;
	actionManager.messageBox = messageBox;
	actionManager.messageBox.load('ajax/respond.html', function(){ if (clicked){console.log('skipping');actionManager.onPingClick(ping)}} );
	actionManager.messageBox.fadeIn();
}

actionManager.onPingClick = function(ping){
	if ( actionManager.state != 5 ) return;
	
	for(var i=0;i<masterList.length;i++){
		if ( masterList[i] !== ping ){
			masterList[i].removeFromMap();
		}
	}
	ping.hideResponses();
	
	google.maps.event.addListener(ping.infoWindow, 'closeclick', function(event) {
		closeRespondTo();
		this.close();
  	});
	
	actionManager._respond_to = ping;
	map.panTo(ping.location.toGoogle());
	
	actionManager.messageBox.children('.step.active').removeClass('active');
	$(actionManager.messageBox.children('.step')[1]).addClass('active');
	
	actionManager.state = 6;
}

actionManager.onMapClick = function(event){
	console.log(this.state, event);
	if ( this.state < 5 && event){
		clearMapOfBubbles();
		if (createMarker) createMarker.setMap(null);
		placeMarker(event.latLng);
		showCreateWindow(createMarker);
		actionManager.state = 2;
		if ( actionManager.messageBox ) {
			actionManager.messageBox.children('.step.active').removeClass('active');
			$('section.step:nth-of-type(2)').addClass('active');
		}
	}else if ( actionManager.state == 6 ){
		///clearMapOfBubbles();
		if (createMarker) createMarker.setMap(null);
		placeMarker(event.latLng).setMap(map);
		actionManager._respond_to.infoWindow.close();
		showRespondWindow(createMarker, actionManager._respond_to);
	}else{

	}
}

actionManager.onAnswerType = function(){
	actionManager.state = 7;
	if ( actionManager.messageBox ) {
		actionManager.messageBox.children('.step.active').removeClass('active');
		$('section.step:nth-of-type(3)').addClass('active');
	}
}


actionManager.onAnswerBlur = function(){
	actionManager.state = 8;
	if ( actionManager.messageBox ) {
		actionManager.messageBox.children('.step.active').removeClass('active');
		$('section.step:nth-of-type(4)').addClass('active');
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
	actionManager.state=4;
}

actionManager.onCreateClose = function(){
	actionManager.messageBox.fadeOut();
}

actionManager.onRespondClose = function(){
	actionManager.state = -1;
	actionManager.messageBox.fadeOut();
	createMarker.setMap(null);
	showRecentPings();
}

actionManager.onSumbitCreate = function(txt, cat, anchor){
	actionManager.state = 4;
	if ( actionManager.messageBox ) {
		actionManager.messageBox.fadeOut();
		console.log(createBox);
	}

	sentPingsList.push( new Ping({
							location: new Location(anchor.position),
							text: txt,
							category: cat,
							created: new Date(),
							from: 'TestUser'
						}));
	sentPingsList[sentPingsList.length-1].addToMap(anchor.map);
	
	masterList.push(sentPingsList[sentPingsList.length-1]);
	
	var id = masterList.length - 1;
	
	createMarker.setMap(null); 
	
	console.log('here', {
							location: new Location(anchor.position),
							text: txt,
							category: cat,
							created: new Date(),
							from: 'TestUser'
						});
	
	$('#activity-box section.activity:first').before('<section class="activity new" style="display:none" onClick="clearMapOfBubbles();google.maps.event.trigger(maserList['+id+'].marker, \'click\')" >\
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


actionManager.onAnswerEnter = function(txt, location, ping){
	actionManager.state = -1;
	if ( actionManager.messageBox ) {
		actionManager.messageBox.fadeOut();
	}
	
	
	createMarker.setMap(null); 
	

	var new_ping = new Ping({
							location: location,
							text: txt,
							category: ping.category,
							created: new Date(),
							from: user.username
						});
	
	
	ping.addResponse(new_ping);
	
	respondedToList.push( ping );
	
	respondedToList[respondedToList.length-1].addToMap(ping.marker.map);
	
	new_ping.addToMap(ping.marker.map);
	
	masterList.push(ping);
	
	var id = masterList.length - 1;
	
	$('#activity-box section.activity:first').before('<section class="activity new" style="display:none" onClick="clearMapOfBubbles();google.maps.event.trigger(masterList['+id+'].marker, \'click\')" >\
		<h1 class="respond">'+ping.getText()+'</h1>\
		<div class="info">\
			<p>ping sent seconds ago</p>\
		</div>\
	</section>');
	$('#activity-box section.activity.new').slideDown().removeClass('new');
	
	$('#bottom-notes').html('Your Response Has Been Sumbitted');
	$('#bottom-bar').addClass('hilight');
	setTimeout('$("#bottom-bar").removeClass("hilight")', 1000);
}


actionManager.searchStart = function(text){
	console.log('searchStart('+text+')');
}
