var request = require('request');
var prompt = require('prompt');
var colors = require('colors');
var emoji = require('node-emoji');


var darkSkyURL = "https://api.darksky.net/forecast/c28893f8002931042f753dae308e8ce5/";
var googleURL = "https://maps.googleapis.com/maps/api/geocode/json?address=";


// 
// Start the prompt 
// 
prompt.start();

// 
// Get longitute and latitute of geolocation of city
// 
prompt.get(['location'], function(err, result) {

    // 
    // Log the results. 
    // 
    console.log('Command-line input received:');
    console.log('Enter your location: ' + result.location);

    googleURL = googleURL + result.location;


    // Get geolocation of city
    request(googleURL, function(err, response) {
        if (err) {
            console.log("Something bad happened", err);
        }
        else {
            var searchResults = JSON.parse(response.body)

            var lat1 = Math.round(searchResults.results[0].geometry.location.lat * 100) / 100;
            var lon1 = Math.round(searchResults.results[0].geometry.location.lng * 100) / 100;

            console.log(result.location + " lat: " + lat1);
            console.log(result.location + " lon: " + lon1);

        }

        darkSkyURL = darkSkyURL + lat1 + "," + lon1;
        console.log(darkSkyURL);

        // Get geolocation of ISS
        request(darkSkyURL, function(err, response) {
            if (err) {
                console.log("Something bad happened", err);
            }
            else {
                var weatherResults = JSON.parse(response.body)
                //console.log(weatherResults.daily);

                var fiveDays = weatherResults.daily.data.slice(0,5);
                //console.log(fiveDays);
                
                fiveDays.forEach(function(item,index){
                    console.log(item.summary + " | " + item.icon + " | " + emoji.emojify(':snow_cloud:'));
                    
                })
            }
        });
    });
});
