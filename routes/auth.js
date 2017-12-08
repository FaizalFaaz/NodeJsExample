
var router = require('express').Router();
var passport = require('passport');

var Account = require('../models/account');

router.get('/register', function(req, res, next){
  res.render('register', {
    title: 'Register',
    user: req.user
  });
});

router.get('/login', function(req, res, next){
  res.render('login', {
    title: 'Login',
    failureMessage: '',
    user: req.user
  });
});

router.post('/register', function(req, res, next){
  Account.register(
    new Account({ username: req.body.username }),
    req.body.password,
    function(err, account){
      if(err){
        console.log(err);
        res.redirect('/auth/register');
      } else {
        res.redirect('/')
      }
    }
  )
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/products',

  failureRedirect: '/',
  failureMessage: 'Invalid Login'
}))

router.get('/facebook', passport.authenticate('facebook'))

router.get('/facebook/callback', passport.authenticate('facebook', {
  failureRedirect: '/login',
  failureFlash: true
  }),
  function(req, res){
    res.redirect('/products');
  }
)
router.get('/logout', function(req, res, next){
  req.logout();
  res.redirect('/');
})

module.exports = router;
