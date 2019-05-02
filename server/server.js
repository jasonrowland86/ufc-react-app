//Initiate App
const express = require('express');
const app = express();

//Require Dependencies
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');

require('dotenv').config();

//Set Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

//Set Static folder
app.use(express.static('public'));

//Set App to port
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

//Routes
const userRoutes = require('./routes/user-routes');
app.use('/', userRoutes);

const authRoutes = require('./routes/auth-routes');
app.use('/', authRoutes);

const ufcRoutes = require('./routes/ufc-routes');
app.use('/', ufcRoutes);

// app.get('*', (req, res) => {
//   const err = new Error('Not found!');
//   // res.status(404).send(err);
//   console.log(err);
//   // res.render('error', {
//   //   message: 'Page not found!'
//   // })
//
//   res.send({message: 'Page not found!'});
// });
