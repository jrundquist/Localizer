function startRespond(ping){
	actionManager.onStartRespond($('#message-box'), ping?true:false, ping);
}

function showRespondWindow(marker, ping) {
	
	masterList.push(ping);
	
	if ( createBox ) createBox.close();
  	
	var id;

	if ( $.inArray(ping, masterList) != -1 ){
		id = $.inArray(ping, masterList);
	}else{
		masterList.push(ping);
		id = masterList.length - 1;
	}
	
	$.get('/ajax/respond-form.php?t='+ping.text+'&i='+id, function(data) {
	  	createBox = new google.maps.InfoWindow({ 
			content: data	
		}); 
		google.maps.event.addListener(createBox,'closeclick', function() { 
			createMarker.setMap(null); 
			actionManager.onRespondClose();
		});
		createBox.open(map, marker);
	});
	
}

function submitAnswer(){
	
	
	google.maps.event.clearListeners(map, 'click');

	console.log('sending id', $('#answer-form').attr('ping'));

	var ping = masterList[$('#answer-form').attr('ping')];
	
	actionManager.onAnswerEnter($('#answer-form textarea#resp-answer').attr('value'), new Location(createBox.getAnchor().position), ping);
	
	closeRespondTo();
	
	setTimeout("actionManager.mapOnClickAddPing();", 500);
	
}


function closeRespondTo(){
	
	if ( createBox ) {
		google.maps.event.trigger(createBox, 'closeclick');
		createBox.close();
	}
	if ( createMarker ) createMarker.setMap(null);
	
	actionManager.state = -1;
	
	$('#settings-underlay').fadeOut();
	$('#activity-box').fadeIn(500);

	$('#message-box').fadeOut('normal',function(){$(this).css({
	    'width': '',
		'height': '',
		'left': '',
		'top': '',
	    'margin-left': ''
	  });});
	
	showRecentPings();
}



function respondTo(id, marker){	
	startRespond(masterList[id]);
}
