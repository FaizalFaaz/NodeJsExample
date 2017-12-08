var express = require('express');
var router = express.Router();


var Account = require('../models/account');

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    next();
  } else {
    res.redirect('/')
  }
}

router.use(isLoggedIn)

router.get("/", function(req, res, next){

  Account.find(function(err, users){
    if(err){
      res.render('error', {
        message: "user Query Failed",
        error: err,
user: req.user
      });
    } else {
      res.render('users', {
      users: users,
        title: "Users",
        user: req.user
      });
    }
  })
})


function renderError(res, mess, err){
  res.render('error', {
    message: mess,
    error: err,
    user: req.user
  })
}

module.exports = router;
