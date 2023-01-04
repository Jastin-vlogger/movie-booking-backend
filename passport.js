const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require("passport");
require('dotenv').config()

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_SELENT_ID


passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      async function (req,accessToken, refreshToken, profile, done) {
         done(null, profile);
        console.log(profile)
      }
    )
  );

  passport.serializeUser((user, done) => {
    // console.log(user)
    done(null, user);
  });

  
passport.deserializeUser((user, done) => {
    done(null, user);
  });
  
  