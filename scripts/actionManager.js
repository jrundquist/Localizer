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
	google.maps.event.addListener(map, 'click', function(event) {
		if (createMarker) createMarker.setMap(null);
		placeMarker(event.latLng);
		showCreateWindow(createMarker);
		actionManager.onMapClick();
  	});
}

actionManager.onStartCreate = function(messageBox, clicked){
	messageBox = messageBox || $('#message-box');
	actionManager.state = 1;
	actionManager.messageBox = messageBox;
	actionManager.messageBox.load('ajax/create.html', function(){ if (clicked){actionManager.onMapClick()}} );
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

actionManager.onCreateClose = function(){
	actionManager.messageBox.fadeOut();
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
	
	createMarker.setMap(null); 
	
	console.log('here', {
							location: new Location(anchor.position),
							text: txt,
							category: cat,
							created: new Date(),
							from: 'TestUser'
						});
	
	$('#activity-box section.activity:first').before('<section class="activity new" style="display:none">\
		<h1 class="create" onClick="(sentPingsList['+(sentPingsList.length-1)+'].showDetails())">'+txt+'</h1>\
		<div class="info">\
			<p>ping sent seconds ago</p>\
		</div>\
	</section>');
	$('#activity-box section.activity.new').slideDown().removeClass('new');
	
	
	
	$('#bottom-notes').html('Your Ping Has Been Sumbitted');
	$('#bottom-bar').addClass('hilight');
	setTimeout('$("#bottom-bar").removeClass("hilight")', 1000);
}


actionManager.onAnswerEnter = function(){
	console.log('actionManager.onAnswerEnter called');
}
