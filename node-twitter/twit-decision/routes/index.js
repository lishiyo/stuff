var express = require('express');
var router = express.Router();
var twit = require('twit');
var sentimental = require('Sentimental');
var config = require("./config");

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* exports.ping */
router.get('/ping', function(req, res) {
	res.status(200).send("pong!");
});

router.post('/search', function(req, res) {
	// grab the request from the client
	// req = {'choices': JSON.stringify(choices)}
	console.log("params: " + JSON.stringify(req.params) + " & query: " + JSON.stringify(req.query) + " & body: " + JSON.stringify(req.body));
  var choices = JSON.parse(req.body.choices);
  // grab the current date
  var today = new Date();
  // establish the twitter config (grab your keys at dev.twitter.com)
  var twitter = new twit({
    consumer_key: config.consumer_key,
    consumer_secret: config.consumer_secret,
    access_token: config.access_token,
    access_token_secret: config.access_token_secret
  });
  // set highest score
  var highestScore = -Infinity;
  // set highest choice
  var highestChoice = null;
	// set highest score
  var lowerScore = -Infinity;
  // set highest choice
  var lowerChoice = null;
  // create new array
  var array = [];
  // set score
  var score = 0;
  console.log("----------")

  // iterate through the choices array from the request
  for(var i = 0; i < choices.length; i++) {
    (function(i) {
    // add choice to new array
    array.push(choices[i])
    // grad 20 tweets from today
    twitter.get('search/tweets', {q: '' + choices[i] + ' since:' + today.getFullYear() + '-' +
      (today.getMonth() + 1) + '-' + today.getDate(), count: 200}, function(err, data) {
        // perform sentiment analysis
        score = performAnalysis(data['statuses']);
        console.log("current score:", score)
        console.log("current choice:", choices[i])
        //  determine winner
        if(score > highestScore) {
					// always runs first time
					lowerScore = highestScore; //-Infinity on first
					lowerChoice = highestChoice; //null on first
					console.log("first pass: " + lowerScore + " with lowerChoice: " + lowerChoice);
					
          highestScore = score;
          highestChoice = choices[i];
          console.log("current winner: ", choices[i])
        } else { // second not > first
					lowerScore = score;
					lowerChoice = choices[i];
					console.log("second not greater! " + lowerScore + " and lowerChoice: " + lowerChoice);
					console.log("current winner: ", highestChoice);
				}
			
        console.log("")
      });
    })(i)
  };
	
	function performAnalysis(tweetSet) {
  //set a results variable
  var results = 0;
  // iterate through the tweets, pulling the text, retweet count, and favorite count
  for(var i = 0; i < tweetSet.length; i++) {
    tweet = tweetSet[i]['text'];
    retweets = tweetSet[i]['retweet_count'];
    favorites = tweetSet[i]['favorite_count'];
    // remove the hastag from the tweet text
    tweet = tweet.replace('#', '');
    // perform sentiment on the text
    var score = sentimental.analyze(tweet)['score'];
    // calculate score
    results += score;
    if(score > 0){
      if(retweets > 0) {
        results += (Math.log(retweets)/Math.log(2));
      }
      if(favorites > 0) {
        results += (Math.log(favorites)/Math.log(2));
      }
    }
    else if(score < 0){
      if(retweets > 0) {
        results -= (Math.log(retweets)/Math.log(2));
      }
      if(favorites > 0) {
        results -= (Math.log(favorites)/Math.log(2));
      }
    }
    else {
      results += 0;
    }
  }
  // return score
  results = results / tweetSet.length;
  return results
}
	
	 // send response back to the server side; why the need for the timeout?
  setTimeout(function() { 
		res.end(JSON.stringify({
			'score': highestScore, 
			'choice': highestChoice,
			'lowerScore': lowerScore,
			'lowerChoice': lowerChoice
		})) 
	}, 5000); 
});

module.exports = router;
