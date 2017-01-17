var request = require('request');

var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=montreal';

function requestJson(url, callbackFunction) {
    
    request(url, function(error, response) {
        
        if (error) {
            callbackFunction(error);
        }
        else {
            try {
                var parsed = JSON.parse(response.body);
                //next line will only be executed if there is no error in the previous line. If error, it goes to catch
                callbackFunction(null, parsed);
            }
            catch (err) {
                callbackFunction(err);
            }
        }
    });
}

function callbackFunction(error, objectOfUrl) {
    console.log(error); 
    console.log(objectOfUrl);
}

requestJson(url, callbackFunction);