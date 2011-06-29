Location = function(lat, lon){
	if ( typeof(lat) == "object" ){ 
		this.lat = lat.lat();
		this.lon = lat.lng();
	}else{		
		this.lat = lat;
		this.lon = lon;
	}
}

Location.prototype.lat = null;
Location.prototype.lon = null;

Location.prototype.toGoogle = function(){
	return new google.maps.LatLng(this.lat, this.lon);
}



Ping = function(args) { 
	if ( args == null || typeof(args) != "object" )
		return
	
	this.responses = Array();

	this.setFrom(args.from)
		.setText(args.text)
		.setType(args.type)
		.setCategory(args.category)
		.setLocation(args.location)
		.setCreationTime(args.creationTime);
}

Ping.prototype.from = '';
Ping.prototype.text = '';
Ping.prototype.type = 'question';
Ping.prototype.category = '';
Ping.prototype.location = new Location();
Ping.prototype.creationTime = new Date();
Ping.prototype.responses = Array();
Ping.prototype.marker = undefined;
Ping.prototype.infoWindow = undefined;

Ping.prototype.getLocation = function(){
	return this.location;	
}
Ping.prototype.getFrom = function(){
	return this.from;	
}
Ping.prototype.getText = function(){
	return this.text;
}
Ping.prototype.getType = function(){
	return this.type;
}
Ping.prototype.getCategory = function(){
	return this.categery;
}
Ping.prototype.getCreationTime = function(){
	return this.creationTime;
}
Ping.prototype.getResponses = function(){
	return this.responses;
}
Ping.prototype.setLocation = function(location){
	this.location = location;
	return this;
}
Ping.prototype.setFrom = function(from){
	this.from = from;
	return this;
}
Ping.prototype.setType = function(type){
	this.type = type;
	return this;
}
Ping.prototype.setText = function(text){
	this.text = text;
	return this;
}
Ping.prototype.setCategory = function(category){
	this.category = new String(category);
	return this;
}
Ping.prototype.setCreationTime = function(time){
	this.creationTime = time || new Date();
	return this;
}
Ping.prototype.setRepsonses = function(responses){
	this.responses = responses;
	return this;
}
Ping.prototype.addResponse = function(response){
	this.responses.push(response);
	if ( this.infoWindow ) this.createInfoWindow();
	return this;
}
Ping.prototype.createMarker = function(){
	
	image = new google.maps.MarkerImage('/images/map/'+this.category.toLocaleLowerCase()+'.png',
	      // This marker is 20 pixels wide by 32 pixels tall.
	      new google.maps.Size(32, 37),
	      // The origin for this image is 0,0.
	      new google.maps.Point(0,0),
	      // The anchor for this image is the base of the flagpole at 0,32.
	      new google.maps.Point(16, 37));
	
	shadow = new google.maps.MarkerImage("/images/map/shadow.png",
		new google.maps.Size(51.0, 37.0),
		new google.maps.Point(0, 0),
		new google.maps.Point(16.0, 37));

	this.marker = new google.maps.Marker({
		position: this.location.toGoogle(),
		icon: image,
		shadow: shadow
	});
	
	this.marker._ping = this; 
	this.marker.__clicked = false;
	
	google.maps.event.addListener(this.marker, 'click', function() {
	    this._ping.showDetails();
		this._ping.showResponses();
		this.__clicked = true;
		actionManager.onPingClick(this._ping);
	  });
	
	google.maps.event.addListener(this.marker, 'mouseover', function() {
		this._ping.showResponses();
	  });
	
	google.maps.event.addListener(this.marker, 'mouseout', function() {
		if ( this.__clicked != true ){
			this._ping.hideResponses();
		}
	  });
	
	this.createInfoWindow();
	
	return this;
}
Ping.prototype.createInfoWindow = function(){
	
	var resp = '';
	var cont = $(document.createElement('div')).addClass('bubble-responses');
	
	cont.html('<h1>Ping &mdash; '+this.category+'</h1><h2>'+this.text+'</h2>');
	
	masterList.push(this);
	var id=masterList.length-1;
	
	for(var i=0; i<this.responses.length; i++){
		
		masterList.push(this.responses[i]);
		
		
		resp = $(document.createElement('div'))
				.addClass('bubble-response-text')
				.html('<strong>'+this.responses[i].from+'</strong> '+this.responses[i].text+'')
				.attr('ping-id',(masterList.length-1))
				.appendTo(cont);
	}
	
	var button = $(document.createElement('div')).addClass('bubble-respond');
	button.html('<button type="button" onclick="respondTo('+id+')">Respond</button>');
	
	button.appendTo(cont);
	
	this.infoWindow = new google.maps.InfoWindow({ 
		content: cont[0]
	});
	
	this.infoWindow._ping = this; 
	
	google.maps.event.addListener(this.infoWindow, 'closeclick', function() {
		this._ping.hideResponses();
		this._ping.marker.__clicked = false;
	  });
	
	return this;
}
Ping.prototype.addToMap = function(map){
	if ( !this.marker ) {
		this.createMarker();
	}
	if ( this.marker.map != map ){
		this.marker.setMap(map);
	}
	return this;
}
Ping.prototype.removeFromMap = function(map){
	if ( this.marker ) this.marker.setMap(null);
	return this;
}
Ping.prototype.showDetails = function(){
	if ( !this.marker ) {
		this.createMarker();
	}
	this.infoWindow.open(this.marker.map, this.marker);
	return this;
}
Ping.prototype.hideDetails = function(){
	if ( this.infoWindow ){
		google.maps.event.trigger(this.infoWindow, 'closeclick');
		this.infoWindow.close();
	}
	return this;
}	
	
Ping.prototype.showResponses = function(map){
	for(var i=0; i<this.responses.length; i++){
		this.responses[i].addToMap(map || this.marker.map);
	}
}
Ping.prototype.hideResponses = function(){
	for(var i=0; i<this.responses.length; i++){
		this.responses[i].removeFromMap();
	}
}




$('.bubble-response-text').live('mouseenter',function(){
												masterList[$(this).attr('ping-id')].showDetails();
											})
							.live('mouseleave',function(){
												if ( $(this).attr('sticky') != 'true' )
													masterList[$(this).attr('ping-id')].hideDetails();
											})
							.live('click',	function(){
												$(this).attr('sticky', $(this).attr('sticky')!='true'?'true':'false');
											});




