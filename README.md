Node-Twitter-Sentiment
======================

Experimenting with twitter api on server side (node), based off this tutorial: 
http://mherman.org/blog/2014/02/19/node-twitter-sentiment/#.VBk-2GBX-uZ

The "tut-one" folder is a small guessing game. I added a route /userlist to the route to practice with mongodb.
  cd part3 && npm install
  node app
  
The "twit-decision" folder is the actual Twitter Sentiment app, using the npm packages 'twit' and 'Sentiment' to retrieve the last 200 tweets of the day for each of the queries you'd like to compare and generate a sentiment score.

Note that you will need to add a config.js file to the routes folder to set your Twitter api key, secret, and access token key and secret.
