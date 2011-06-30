function preformSearch(){
	var txt, patt, results;
	txt = $('#search-input').val();
	actionManager.searchStart(txt);
	
	if ( txt == '' ) txt = '.';
	patt = new RegExp(txt,'i');
	
	results = new Array();
	
	
	map.setMapTypeId('searching');
    
	if (mapStyleTimer) clearTimeout(mapStyleTimer);
	mapStyleTimer = setTimeout("map.setMapTypeId('map');", 1200);

	for( var i=0;i<masterList.length; i++ ){
		masterList[i].addToMap(map);
		if ( !masterList[i].text || !masterList[i].category) continue;
		console.log(masterList[i].text);
		if ( patt.test(masterList[i].text) == true || patt.test(masterList[i].category) == true){
			results.push(masterList[i]);
		}else{
			masterList[i].removeFromMap();
		}
	}	
	
	if ( txt != '.' )
		$('#bottom-notes').html(results.length+' Pings found matching "'+txt+'"');
		
}