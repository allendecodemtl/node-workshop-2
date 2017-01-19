var requestPromise = require('request-promise');
var promptPromise = require('prompt-promise');

// https://words.bighugelabs.com/admin/b94c927ccf7c57e746ede16bb0703ee5
var wordsURL = "http://words.bighugelabs.com/api/2/b94c927ccf7c57e746ede16bb0703ee5/";


var pPromise = promptPromise('Word: ');


pPromise
.then(function(result) {
    console.log('here');
    console.log('Command-line input received:');
    console.log('Enter word: ' + result);

    wordsURL = wordsURL + result.word + "/json";

    var pRequest = requestPromise(wordsURL);
    return pRequest;
})
.then(function(response) {

    var searchResults = JSON.parse(response)
    console.log(searchResults);

})
