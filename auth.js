const passport = require('passport');

//code block from passport doc strategies
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4000/google/callback",
    passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

// Runs when user logs in
// Stores the user info into the session + adds state protocol (HTTP stateless) so they stay logged in
passport.serializeUser(function(user, done) {
  done(null, user);
});

// Runs on every request after login
// Retrieves the stored user info from the session
passport.deserializeUser(function(user, done) {
  done(null, user);
});