const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const init = require('./passport');
const User = require('../models/user');
const auth = require('./auth');

const options = {};

init();

passport.use(
  new LocalStrategy(options, (username, password, done) => {
    User.findOne({name: username}).then((user)=>{
      console.log("local strategy: ", user);
      console.log("password: ", user.password);
      if(!user) {
        console.log("no user");
        return done(null, false);
      }
      if (!auth.comparePass(password, user.password)) {
        console.log("wrong password");
        return done(null, false);
      } else {
        console.log("user!");
        return done(null, user);
      }
    }).catch(err => {
      console.log(err);
      return done(err);
    });
  })
);

module.exports = passport;
