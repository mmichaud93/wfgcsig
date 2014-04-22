var express = require('express');
var fs = require('fs');
var app = express();

app.listen(3000);
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
app.get('/insult', function(request, response) {
	console.log("insult");
});
app.post('/save-insult', function(request, response) {
	console.log("save-insult");
	console.log(request.body);
	var outputFilename = './insults/insults.json';

	fs.writeFile(outputFilename, JSON.stringify(request.body), function(err) {
    	if(err) {
    	  console.log(err);
    	} else {
    	  console.log("JSON saved to " + outputFilename);
    	}
	}); 
});
app.get('/graphicscard', function(request, response) {
	console.log("graphicscard");
});