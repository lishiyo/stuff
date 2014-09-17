Node-Twitter-Sentiment
======================

Experimenting with twitter api on server side (node), based off this tutorial: 
http://mherman.org/blog/2014/02/19/node-twitter-sentiment/#.VBk-2GBX-uZ

The "tut-one" folder is a small number guessing game (check console to see what the right number is if you can't guess it). I added a route /userlist to the root as well to practice adding things to mongodb.
  - cd part3 && npm install
  - node app
  
The "twit-decision" folder is the actual Twitter Sentiment app, using the npm packages 'twit' and 'Sentiment' to retrieve the last 200 tweets of the day for the queries you'd like to compare and generate a sentiment score for each.

Note that you will need to add a config.js file to the routes folder to set your Twitter api key, secret, and access token key and secret.
