function startSubmit(){
	actionManager.onStartCreate($('#message-box'));
}

function showCreateWindow(marker) {
	if ( createBox ) createBox.close();
  	
	
	$.get('/ajax/create-form.html', function(data) {
		actionManager.onStartCreate(0, true);
		
	  	createBox = new google.maps.InfoWindow({ 
			content: data,
		}); 
		google.maps.event.addListener(createBox,'closeclick', function() { 
			createMarker.setMap(null); 
			actionManager.onCreateClose();
		});
		createBox.open(map, marker);
	});
	
}

function submitForm(){
	
	console.log($('#create-form textarea'));
	
	var err = 0;
	
	$('#create-form label').css({'color':''});
	
	if ( $('#create-form select').val() == '' ){
		$('#create-form label:first').css({'color':'#800'}).animate({'opacity':.1}, 300, function(){$(this).animate({'opacity':1}, 300);});
		err = 1;
	}
	
	if ( $('#create-form textarea').attr('value').length > 140 || $('#create-form textarea').attr('value') == ''){
		$('#create-form label:last').css({'color':'#800'}).animate({'opacity':.1}, 300, function(){$(this).animate({'opacity':1}, 300);});
		err = 1;
	}
	
	if ( err != 0 ){
		return ;
	}
	
	actionManager.onSumbitCreate($('#question').attr('value'), $('select#cat').val(), createBox.getAnchor());
	
	google.maps.event.clearListeners(map, 'click');
	createBox.close();	
	
	
	setTimeout("actionManager.mapOnClickAddPing();", 500);
	
	return false;
}
