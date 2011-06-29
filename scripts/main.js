var user = new User();

var sentPingsList = new Array();
var respondedToList = new Array();
var masterList = new Array();

var mapStyleTimer;


respondedTo = new Ping({
						location: new Location(41.41344,2.15323),
						text: 'Do hamburgers usually come with bread?',
						category: 'Other',
						created: new Date(2011, 6, 12, 12, 30, 20, 2),
						from: 'LostTraveler1974'
					});
respondedTo.addResponse( new Ping({
						location: new Location(41.39344,2.12323),
						text: 'Not in Spain!',
						category: 'Other',
						created: new Date(2011, 6, 25, 11, 45, 40, 4),
						from: user.username
					}));

respondedToList.push(respondedTo);


sentPingsList.push( new Ping({
						location: new Location(41.3784,2.1878),
						text: 'Where can I get some good Fish?',
						category: 'Restaurants',
						created: new Date(2011, 6, 27, 20, 04, 34, 2),
						from: user.username
					}));
sentPingsList.push( new Ping({
						location: new Location(41.3875,2.1199),
						text: 'I hear there is a Rose garden out here?',
						category: 'Sights',
						created: new Date(2011, 6, 25, 20, 04, 34, 2),
						from: user.username
					}));
sentPingsList[1].addResponse( new Ping({
						location: new Location(41.3939,2.1846),
						text: 'Look to your left!',
						category: 'Sights',
						created: new Date(2011, 6, 26, 02, 04, 34, 2),
						from: 'HelpFulResponder2039'
					}));	
sentPingsList[1].addResponse( new Ping({
						location: new Location(41.3673,2.1644),
						text: 'It should be just down the street on the left',
						category: 'Sights',
						created: new Date(2011, 6, 26, 02, 04, 34, 2),
						from: 'HiRez'
					}));					

function showRecentPings(){
	for ( var i = 0; i<sentPingsList.length; i++ ){
		sentPingsList[i].addToMap(map);
	}
	for ( var i = 0; i<respondedToList.length; i++){
		respondedToList[i].addToMap(map);
	}
}


