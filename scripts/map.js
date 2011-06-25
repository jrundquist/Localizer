var map;
function showMap(position) {
	
	var stylez = [
		// {
		// 	featureType: "all",
		// 	elementType: "all",
		// 	stylers: [
		// 		{ invert_lightness: true }
		// 	]
		// },{
		// 	featureType: "poi",
		// 	elementType: "all",
		// 	stylers: [
		// 		{ visibility: "off" }
		// 	]
		// },{
		// 	featureType: "road",
		// 	elementType: "all",
		// 	stylers: [
		// 		{ visibility: "simplified" },
		// 		{ saturation: -60 }
		// 	]
		// },{
		// 	featureType: "administrative.province",
		// 	elementType: "all",
		// 	stylers: [
		// 		{ visibility: "on" },
		// 		{ gamma: 0.74 },
		// 		{ lightness: 33 }
		// 	]
		// }

	];

	var myloc = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	var myOptions = {
		zoom: 15,
		disableDefaultUI: true,
		center: myloc,
		mapTypeControlOptions: {
			mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'custom']
		}
	}

	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

	var styledMapOptions = {
		name: "Localizer"
	}

	var jayzMapType = new google.maps.StyledMapType(stylez, styledMapOptions);

	map.mapTypes.set('custom', jayzMapType);
	map.setMapTypeId('custom');
	
	var image = new google.maps.MarkerImage('images/blue-flag.png',
	      // This marker is 20 pixels wide by 32 pixels tall.
	      new google.maps.Size(59, 64),
	      // The origin for this image is 0,0.
	      new google.maps.Point(0,0),
	      // The anchor for this image is the base of the flagpole at 0,32.
	      new google.maps.Point(10, 64));
	
	
	var marker = new google.maps.Marker({
	        position: myloc,
	        map: map,
			icon: image
		});
	
}

function initializeMap() {
	// One-shot position request.
	navigator.geolocation.getCurrentPosition(showMap);
}
