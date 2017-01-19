var requestPromise = require('request-promise');
var promptPromise = require('prompt-promise');

// https://words.bighugelabs.com/admin/b94c927ccf7c57e746ede16bb0703ee5
var wordsURL = "http://words.bighugelabs.com/api/2/b94c927ccf7c57e746ede16bb0703ee5/";

function runSynonyms() {

    var pPromise = promptPromise('Word: ');
    // Get longitute and latitute of city geolocation

    pPromise
        .then(function(result) {

            console.log('Command-line input received:');
            console.log('Enter your word: ' + result);

            wordsURL = wordsURL + result + "/json";
            console.log(wordsURL);
            var pRequest = requestPromise(wordsURL);
            return pRequest;
        })
        .then(function(wordsResult) {
            
            var searchResults;

            try {
                searchResults = JSON.parse(wordsResult);
            }
            catch (e) {
                console.error(e);
            }

            console.log(searchResults)
            
        });

}

runSynonyms();