var url = "http://api.open-notify.org/iss-now.json";

var request = require('request');

request(url, function(err, response) {
  if (err) {
    console.log("Something bad happened", err);
  }
  else {
    var searchResults = JSON.parse(response.body)
    //console.log(searchResults);
    console.log(Math.round(searchResults.iss_position.latitude*100)/100);
    console.log(Math.round(searchResults.iss_position.longitude*100)/100);
  }
});