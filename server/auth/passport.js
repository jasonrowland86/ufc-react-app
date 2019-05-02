const passport = require('passport');
const User = require('../models/user');

module.exports = () => {

  passport.serializeUser((user, done) => {
    done(null, user.name);
  });

  passport.deserializeUser((username, done) => {
    User.findOne({name: username})
    .then(user => {
      done(null, user);
    }).catch(err => {
      done(err, null);
    });
  });
};
