var requestPromise = require('request-promise');
var promptPromise = require('prompt-promise');
var colors = require('colors');
var emoji = require('node-emoji');
var Table = require('cli-table');

var darkSkyURL = "https://api.darksky.net/forecast/c28893f8002931042f753dae308e8ce5/";
var googleURL = "https://maps.googleapis.com/maps/api/geocode/json?address=";


function howtheweather() {
    var lat1, lon1;

    var pPromise = promptPromise('City: ');
    // Get longitute and latitute of city geolocation

    pPromise
    .then(function(result) {

        console.log('Command-line input received:');
        console.log('Enter your location: ' + result);

        googleURL = googleURL + result;

        var googlePromise = requestPromise(googleURL);
        return googlePromise;
    })
    .then(function(gmapsResult) {

        var searchResults;

        try {
            searchResults = JSON.parse(gmapsResult);
        }
        catch (e) {
            console.error(e);
        }

        lat1 = Math.round(searchResults.results[0].geometry.location.lat * 100) / 100;
        lon1 = Math.round(searchResults.results[0].geometry.location.lng * 100) / 100;

        darkSkyURL = darkSkyURL + lat1 + "," + lon1;

        var darkSkyPromise = requestPromise(darkSkyURL);
        return darkSkyPromise;

    })
    .then(function(response) {

        var weatherResults;

        try {
            weatherResults = JSON.parse(response);
        }
        catch (e) {
            console.error(e);
        }

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
    });

}

howtheweather();