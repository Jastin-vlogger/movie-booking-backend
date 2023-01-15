const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
require("dotenv").config();
const User = require("./models/user");
const { generateToken } = require("./utils/generatetoken");
const jwt = require("jsonwebtoken");

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_SELENT_ID;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async function (req, accessToken, refreshToken, profile, done) {
      const googleId = profile.id;
      const email = profile.emails[0].value;
      const name = profile.name.givenName;
      const lastName = profile.name.familyName;
      const currentUser = await User.findOne({ email });
      if (!currentUser) {
        console.log("in current user");
        const user = new User({
          googleId,
          email,
          name,
        });
        user.save();
      }
      const token = await generateToken(googleId);
      return done(null, { token, profile });
    }
  )
);

passport.serializeUser(async (user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
