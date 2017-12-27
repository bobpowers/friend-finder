var path = require("path");
var friendsTable = require("../data/friends.js");
var differenceResults = [];
var friendMatchIndex = 0;
var runningTotal = 0;

// cycles through friends in JSON and pushes result differences to an array
var findAMatch = function(iNeedAFriend, callback){
	for (var i = 0; i < friendsTable.length; i++) {
		for (var j = 0; j < iNeedAFriend.length; j++) {
			var serverFriend = parseFloat(friendsTable[i].scores[j]);
			var clientFriend = parseFloat(iNeedAFriend[j]);
			runningTotal += (Math.abs(serverFriend - clientFriend));
		}
		differenceResults.push(runningTotal)
		runningTotal = 0;
	}
	callback()
}

// this is the callback to determine where the friend is in the JSON

var findSmallerNumber = function(){
    var minNumber = differenceResults[0];
    var minIndex = 0;
    for (var i = 0; i < differenceResults.length; i++) {
        if (differenceResults[i] < minNumber) {
            minIndex = i;
            minNumber = differenceResults[i];
        }
    }
    friendMatchIndex = minIndex;
    console.log(friendMatchIndex);
    differenceResults = [];
    return friendMatchIndex;
};


// findAMatch uses a callback to delay the response to client

module.exports = function(app){
	app.get("/api/friends", function(request, response){
		response.json(friendsTable);
	});
	app.post("/api/friends", function(request, response){
		findAMatch(request.body.scores, findSmallerNumber);
		response.json(friendsTable[friendMatchIndex]);
		friendsTable.push(request.body);
		response.end();
	});
}