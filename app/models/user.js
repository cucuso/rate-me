// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

  instagramId   : String,
  accessToken : String,
  name     : String,
  username : String,
  images : [{url:String, rating:Number}]
});

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
