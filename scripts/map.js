var map;
var createMarker;
var createBox;
function showMap(position) {
	
	var stylez = [];
	
	var searchingStyle = 	[
							  {
							    featureType: "all",
							    elementType: "all",
							    stylers: [
							      { visibility: "on" },
							      { saturation: -80 },
							      { lightness: -57 }
							    ]
							  }
							]

	var myloc = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	var myOptions = {
		zoom: 13,
		disableDefaultUI: true,
		center: myloc,
        navigationControlOptions: {style: 'SMALL',position: 'TOP_RIGHT'}, 
        mapTypeId: 'ROADMAP'
	}
	
	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

	var styledMapOptions = {
		name: "Localizer"
	}

	var jayzMapType = new google.maps.StyledMapType(stylez, styledMapOptions);
	var jayzMapType2 = new google.maps.StyledMapType(searchingStyle, {name: "Searching..."});

	map.mapTypes.set('map', jayzMapType);
	map.setMapTypeId('map');
	
	map.mapTypes.set('searching', jayzMapType2);
	
	
	var image = new google.maps.MarkerImage('images/blue-flag.png',
	      // This marker is 20 pixels wide by 32 pixels tall.
	      new google.maps.Size(59, 64),
	      // The origin for this image is 0,0.
	      new google.maps.Point(0,0),
	      // The anchor for this image is the base of the flagpole at 0,32.
	      new google.maps.Point(10, 64));
	
	
	// Add the You are Here Flag
	var marker = new google.maps.Marker({
	        position: myloc,
	        map: map,
			icon: image
		});
		
		
	actionManager.mapOnClickAddPing();
	actionManager.mapOnLoad();
}


google.maps.Map.prototype.clearMarkers = function() {
    if ( !this.markers ) return;
	for(var i=0; i < this.markers.length; i++){
        this.markers[i].setMap(null);
    }
    this.markers = new Array();
};

function placeMarker(location) {
  createMarker = new google.maps.Marker({
      position: location, 
      map: map
  });
  map.panTo(location);
  return createMarker;
}


function noLocation(error){
	if ( error.code == error.PERMISSION_DENIED ){
		$('#map_canvas .error').html('<h1>Location Permission has been Denied</h1><h2>TheLocalizer needs permission to access your location.</h2><h3>Please enable location sharing for this site. Instructions on doing so can be found <a href="http://www.google.com/support/chrome//support/chrome/bin/answer.py?answer=142065" target="_blank">here</a>.</h3>');
	}else{
		console.log(error);
	}
}


function initializeMap() {
	// One-shot position request.
	navigator.geolocation.getCurrentPosition(showMap, 
											noLocation,
											{
												enableHighAccuracy: true,
												timeout: 5000,
												maximumAge: 60
											});
}

function clearMapOfBubbles() {
	for ( var i = 0; i < masterList.length; i++ ){ 
		masterList[i].hideDetails();
	}
	if (createMarker) createMarker.setMap(null);
	if (createBox) createBox.close();
}
