var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var config = require('./config/config');

var mongoose = require('mongoose');

mongoose.connect(config.mongodb);

var session = require('express-session');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');

var auth = require('./routes/auth');
var index = require('./routes/index');
var products = require('./routes/products');

var user = require('./routes/users');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(flash());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: config.session_secret,
resave: true,
  saveUninitialized: false
}))

app.use(passport.initialize());

app.use(passport.session());

var Account = require('./models/account');
passport.use(Account.createStrategy());

var FacebookStrategy = require('passport-facebook').Strategy;
passport.use(new FacebookStrategy(
  config.oauth_credentials.facebook,
  function(accessToken, refreshToken, profile, done){
    // what to do when fb returns a profile
    // check if this fb profile is in our accounts already.

    Account.findOne({ facebookOauthID: profile.id }, function(err, user){
      if(err){
        return console.log(err);
      }

      if(user){
        return done(null, user);
      }

      // at this point we've handled errors, and existing users
      // create a new user for this profile.
      user = new Account({
        facebookOauthID: profile.id,
        name: profile.displayName, // for github, this is .username
        created: Date.now()
      })

      // save the record to the database
      user.save(function(err){
        if(err){
          console.log(err)
        } else {
          done(null, user)
        }
      })
    })
  })
)

// these tell passport how/where to get the user information
// from for each page
passport.serializeUser(function(user, done){
  done(null, user.id)
});
passport.deserializeUser(function(id, done){
  Account.findById(id, function(err, user){
    done(err, user)
  })
});
app.use('/auth', auth);
app.use('/', index);
app.use('/products', products);

app.use('/users', user);


app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
