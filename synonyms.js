var request = require('request');
var prompt = require('prompt');
var colors = require('colors');
var emoji = require('node-emoji');


// https://words.bighugelabs.com/admin/b94c927ccf7c57e746ede16bb0703ee5
var wordsURL = "http://words.bighugelabs.com/api/2/b94c927ccf7c57e746ede16bb0703ee5/";


// 
// Start the prompt 
// 
prompt.start();

// 
// Get longitute and latitute of geolocation of city
// 
prompt.get(['word'], function(err, result) {

    // 
    // Log the results. 
    // 
    console.log('Command-line input received:');
    console.log('Enter word: ' + result.word);

    wordsURL = wordsURL + result.word + "/json";

    // Get synonyms from api
    request(wordsURL, function(err, response) {
        // catching error from API call
        if (err) {
            console.log("Error calling dictionary API", err);
        }
        else { // API call successful 
            try {
                var searchResults = JSON.parse(response.body)
                console.log(searchResults);
            }
            catch (error) {
                console.log(error);
            }
        }
    });
});
