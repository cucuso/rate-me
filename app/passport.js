// load all the things we need
var InstagramStrategy   = require('passport-instagram').Strategy;
// load up the user model
var User = require('./models/user.js');

// expose this function to our app using module.exports
module.exports = function(passport) {

  // =========================================================================
  // passport session setup ==================================================
  // =========================================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  // used to serialize the user for the session
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  passport.use(new InstagramStrategy({
        clientID: '04769435047b4677b8166cd4b4653392',
        clientSecret: 	'f9087d409ea7421da1bcfdfed78a921e',
        callbackURL: "http://localhost:8080/auth/instagram/callback"
      },
      function(accessToken, refreshToken, profile, done) {

          // asynchronous
          // User.findOne wont fire unless data is sent back
          process.nextTick(function() {


              User.findOne({ instagram_id :  profile.id }, function(err, user) {
                  // if there are any errors, return the error
                  if (err)
                      return done(err);

                  // check to see if theres already a user with that email
                  if (!user) {
                      // if there is no user with that email
                      // create the user
                      var newUser = new User();

                      // set the user's local credentials
                      newUser.instagram_id    = profile.id;
                      newUser.name = profile.full_name;
                      newUser.username = profile.username;
                      // save the user
                      newUser.save(function(err) {
                          if (err)
                              throw err;
                          return done(null, newUser);});
                  } else {
                      //found user. Return
                      return done(err, user);

                  }
              });
          });
      }));
}
