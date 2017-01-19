var inquirer = require('inquirer');
var requestPromise = require('request-promise');


var redditURL = "https://www.reddit.com/.json";

function runReddit() {
    var menuChoices = [{
        name: 'Show homepage',
        value: 'HOMEPAGE'
    }, {
        name: 'Show subreddit',
        value: 'SUBREDDIT'
    }, {
        name: 'List subreddits',
        value: 'SUBREDDITS'
    }];

    inquirer.prompt({
        type: 'list',
        name: 'menu',
        message: 'What do you want to do?',
        choices: menuChoices
    })
    .then(function(answers) {
        console.log(answers);

        if (answers.menu === 'HOMEPAGE'){
            var homePromise = requestPromise(redditURL);
            return homePromise;
        }
    })
    .then(function(homePageResults) {

        var homePageParsed = JSON.parse(homePageResults);

        homePageParsed.data.children.forEach(function(item) {
            console.log(item.data.num_comments + " | " + item.data.author + " | " + item.data.title);
        })
        
        runReddit();
    });
}


runReddit();