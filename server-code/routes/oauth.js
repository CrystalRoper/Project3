const env = require("dotenv").config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
const request = require('request');

//Twitch credentials 
const TWITCH_CLIENT_ID = '<CLIENT ID HERE>';
const TWITCH_SECRET = '<CLIENT SECRET HERE>';
const SESSION_SECRET = '<SOME SECRET HERE>';
const CALLBACK_URL = '<REDIRECT URL HERE>';  //run locally with - http://localhost:3000/auth/twitch/callback

var app = express();
app.use(session({secret: SESSION_SECRET, resave: false, saveUninitialized: false}));
app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());

OAuth2Strategy.prototype.userProfile = function(accessToken, done) {
    var options = {
      url: 'https://api.twitch.tv/helix/users',
      method: 'GET',
      headers: {
        'Client-ID': TWITCH_CLIENT_ID,
        'Accept': 'application/vnd.twitchtv.v5+json',
        'Authorization': 'Bearer ' + accessToken
      }
    };
  
    request(options, function (error, response, body) {
      if (response && response.statusCode == 200) {
        done(null, JSON.parse(body));
      } else {
        done(JSON.parse(body));
      }
    });
  }
  
  passport.serializeUser(function(user, done) {
      done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
      done(null, user);
  });
  
  passport.use('twitch', new OAuth2Strategy({
      authorizationURL: 'https://id.twitch.tv/oauth2/authorize',
      tokenURL: 'https://id.twitch.tv/oauth2/token',
      clientID: TWITCH_CLIENT_ID,
      clientSecret: TWITCH_SECRET,
      callbackURL: CALLBACK_URL,
      state: true
    },
    function(accessToken, refreshToken, profile, done) {
      profile.accessToken = accessToken;
      profile.refreshToken = refreshToken;
  
      // Securely store user profile in your DB
      //User.findOrCreate(..., function(err, user) {
      //  done(err, user);
      //});
  
      done(null, profile);
    }
  ));
  
  // Set route to start OAuth link, this is where you define scopes to request
  app.get('/auth/twitch', passport.authenticate('twitch', { scope: 'user_read' }));
  
  // Set route for OAuth redirect
  app.get('/auth/twitch/callback', passport.authenticate('twitch', { successRedirect: '/', failureRedirect: '/' }));
  
  // Define a simple template to safely generate HTML with values from user's profile
  //Insert React code here??
  //______
  //______
  //______
  
  // If user has an authenticated session, display it, otherwise display link to authenticate
  app.get('/', function (req, res) {
    if(req.session && req.session.passport && req.session.passport.user) {
      res.send(template(req.session.passport.user));
    } else {
      res.send("");
    }
  });
  
  app.listen(3000, function () {
    console.log('Twitch auth listening on port 3000!')
  });

//GET route created by following Twitch's tutorial step-by-step. Not sure where/how/if to plug in.   
/*
GET https://id.twitch.tv/oauth2/authorize
    ? client_id = eybfndwfvyb0b8kky97jy6qhqm85n4
    & redirect_uri=https://robosquee-chat-bot.herokuapp.com/
    & response_type=code
    & force_verify=true
        & scope=chat: edit chat: read user_blocks_read chat_login channel_check_subscription
        */