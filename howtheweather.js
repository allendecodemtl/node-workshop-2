var request = require('request');
var prompt = require('prompt');
var colors = require('colors');
var emoji = require('node-emoji');
var Table = require('cli-table');

var darkSkyURL = "https://api.darksky.net/forecast/c28893f8002931042f753dae308e8ce5/";
var googleURL = "https://maps.googleapis.com/maps/api/geocode/json?address=";


// 
// Start the prompt 
// 
prompt.start();


// Get longitute and latitute of city geolocation
prompt.get(['location'], function(err, result) {

    // Log the results. 
    console.log('Command-line input received:');
    console.log('Enter your location: ' + result.location);

    //
    // Get geolocation of city
    //
    googleURL = googleURL + result.location;

    request(googleURL, function(err, response) {

        // Catch error from api call
        if (err) {
            console.log("Error calling googleURL", err);
        }
        else {
            try {
                var searchResults = JSON.parse(response.body)
                var lat1 = Math.round(searchResults.results[0].geometry.location.lat * 100) / 100;
                var lon1 = Math.round(searchResults.results[0].geometry.location.lng * 100) / 100;
            }
            catch (error) {
                console.log(error);
            }

        }


        //
        // Get weather data from darkSky 
        //

        darkSkyURL = darkSkyURL + lat1 + "," + lon1;

        request(darkSkyURL, function(err, response) {

            // Catch error from api call
            if (err) {
                console.log("Error calling darkSkyURL", err);
            }
            else {
                try {
                    var weatherResults = JSON.parse(response.body)

                    // Slice next five days
                    var fiveDays = weatherResults.daily.data.slice(0, 5);

                    //****************************
                    // Print results to console
                    //****************************

                    // instantiate table header
                    var table = new Table({
                        head: ['Country', 'Icon', 'Icon Label', 'Summary'],
                        colWidths: [8, 5, 25, 65]
                    });
                    
                    // populate rows
                    fiveDays.forEach(function(item, index) {
                        table.push(
                            [emoji.emojify(':flag-ca:'), emoji.emojify(':snow_cloud:'), item.icon, item.summary]
                        );
                    })

                    // print table
                    console.log(table.toString());
                }
                catch (error) {
                    console.log(error);
                }
            }
        });
    });
});
