function preformSearch(){
	var txt, patt, results;
	txt = $('#search-input').val();
	actionManager.searchStart(txt);
	
	if ( txt == '' ) txt = '.';
	patt = new RegExp(txt,'i');
	
	results = new Array();
	
	
	map.setMapTypeId('searching');
    
	if (mapStyleTimer) clearTimeout(mapStyleTimer);
	mapStyleTimer = setTimeout("map.setMapTypeId('map');", 1000);

	for( var i=0;i<masterList.length; i++ ){
		masterList[i].addToMap(map);
		if ( !masterList[i].text ) continue;
		console.log(masterList[i].text);
		if ( patt.test(masterList[i].text) == true){
			results.push(masterList[i]);
		}else{
			masterList[i].removeFromMap();
		}
	}	
	
	if ( txt != '.' )
		$('#bottom-notes').html(results.length+' Pings found matching "'+txt+'"');
		
}