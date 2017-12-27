var bodyParser = require('body-parser');
var path = require("path");
var express = require('express');
var app = express();
var PORT = process.env.PORT || 8080;

 

app.use(bodyParser.urlencoded({ extended: true }))
 
// parse application/json
app.use(bodyParser.json())

require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);

app.listen(PORT, function(){
	console.log("Listening on PORT: "+PORT);
});