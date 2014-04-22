var express = require('express');
var fs = require('fs');
var app = express();

var port = Number(process.env.PORT || 53535);

app.listen(port, function() {
  console.log("listening on port: "+port);
});
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
app.get('/', function(request, response) {
    response.sendfile('./index.html');
});
app.get('/styles.css', function(request, response) {
    response.sendfile('./styles.css');
});
app.get('/controller.js', function(request, response) {
    response.sendfile('./controller.js');
});
app.get('/insults', function(request, response) {
	readJSONFile("./insults/insults.json", function (err, json) {
		if(err) {
            response.send('404 File Not Found');
        } else {
		    response.send(JSON.stringify(json));
        }
	});
});
app.post('/save-insults', function(request, response) {
	var outputFilename = './insults/insults.json';

	fs.writeFile(outputFilename, JSON.stringify(request.body), function(err) {
    	if(err) {
    	  console.log(err);
    	} else {
    	  console.log("JSON saved to " + outputFilename);
    	}
	}); 
});
app.get('/graphics', function(request, response) {
	readJSONFile("./parts/graphics/graphics.json", function (err, json) {
		if(err) {
            response.send("404 File Not Found");
        } else {
            response.send(JSON.stringify(json));
        }
	});
});

function readJSONFile(filename, callback) {
	fs.readFile(filename, function (err, data) {
    	if(err) {
    		callback(err);
    		return;
    	}
    	try {
    		callback(null, JSON.parse(data));
    	} catch(exception) {
    		callback(exception);
    	}
	});
}