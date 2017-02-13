import https from 'https';

export function getPlaces(req, myApiRes) {
	const location = req.params.location;
	const key = process.env.GOOGLE_SEARCH_KEY || require("../config/googleSearchApi").key;
	var req = https.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=bars+in+${location}&key=${key}`, function(res) {
	  console.log('STATUS: ' + res.statusCode);
	  var bodyChunks = [];
	  res.on('data', function(chunk) {
	    bodyChunks.push(chunk);
	  }).on('end', function() {
	    var body = Buffer.concat(bodyChunks);
	    myApiRes.send(body.toString());
	  })
	});

	req.on('error', function(e) {
	  console.log('ERROR: ' + e.message);
	  myApiRes.status(500).send({message: "Error fetching places from google api"});
	});
}