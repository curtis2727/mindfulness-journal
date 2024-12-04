const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'usernameOrEmail', 
      passwordField: 'password', 
    },
    async (usernameOrEmail, password, done) => {
      try {
        const user = await User.findOne({
          $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
        });

        if (!user) {
          return done(null, false, { message: 'Incorrect username or email.' });
        }

        const isMatch = await user.isValidPassword(password);
        if (!isMatch) {
          return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user);
      } catch (err) {
        console.error('Error during authentication:', err.message);
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user || false);
  } catch (err) {
    console.error('Error during deserialization:', err.message);
    done(err);
  }
});

module.exports = passport;