const express = require('express');
const authRouter = express.Router();
const passport = require('../auth/local');
const auth = require('../auth/auth');
const userController = require('../controllers/user-controller');

authRouter.post('/register', userController.create);

authRouter.post('/login', passport.authenticate('local', {
    successRedirect: '/user',
    failureRedirect: '/login',
    failureFlash: true
  }), (req, res) => {
    console.log("before redirect");
    res.redirect('/user');
  }
);

authRouter.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
})

module.exports = authRouter;
