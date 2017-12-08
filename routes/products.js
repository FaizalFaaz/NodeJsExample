var express = require('express');
var router = express.Router();
var Product = require('../models/products');
var Order = require('../models/order');




router.get("/", function(req, res, next){

  Product.find(function(err, products){
    if(err){
      res.render('error', {
        message: "something went wrong",
        error: err
      });
    } else {
      res.render('products', {
      title: " pro",
        products: products,
        user: req.user,

        Order_complete: req.flash('Order_complete')[0],

      });
    }
  })
})

router.get('/add', function(req, res, next){
  res.render('addproducts', {
    title: "add pro",
        user: req.user
      });
})
router.post('/add1', function(req, res, next){
  Product.create({
    productname: req.body.productname,
    brand: req.body.brand,
    price: req.body.price,
            user: req.user
  }, function(err){
    if(err){
      res.render('error', {
              error: err,
            });
    } else {
      res.redirect('/products')
    }
  })
})



router.get('/:id', function(req, res, next){
  var id = req.params.id;

  Product.findById(id, function(err, product){
    if(err){
      res.render('error', {
        message: "Could not find",
        error: err
      })
    } else {
      res.render('order', {
        title: 'order now',
        product: product,
        user: req.user
      })
    }
  })
})

router.get('/orderfind/:username', function(req, res, next){
  var user = req.params.username;

  Order.find(user, function(err, orders){
    if(err){
      res.render('error', {
        message: "Could not find",
        error: err
      })
    } else {
      res.render('myorders', {
        title: 'order now',
        orders: orders,
user: req.user
      })
    }
  })
})


router.post('/order', function(req, res, next){
  Order.create({
    address: req.body.address,
    phone: req.body.phone,
    product: req.body.product,
    user:req.body.username

  }, function(err){
    if(err){
      res.render('error', {
              error: err,
            });
    } else {

    req.flash('Order_complete', 'Your Order is successfull')
      res.redirect('/products')
    }
  })
})
router.get('/update/:id', function(req, res, next){
  // collect the ID from the url
  var id = req.params.id;

  Product.findById(id, function(err, product){
    if(err){
      res.render('error', {
        message: "Could not load ",
        error: err,
        user: req.user
      })
    } else {
      res.render('update', {
        title: 'update',
        product: product,
        user: req.user
      })
    }
  })
})


router.post('/update/:id', function(req, res, next){
  var id = req.params.id;

  var productDetails = {

    productname: req.body.productname,
    brand: req.body.brand,
    price: req.body.price,
            user: req.user
  }

    Product.update({ _id: id }, productDetails, function(err){
    if(err){
      renderError(res, "Could not update ", err);
    } else {
      res.redirect('/products')
    }
  })
})



router.get('/delete/:id', function(req, res, next){
  var id = req.params.id;

  // get rid of the unwanted car. We like new things
  Order.remove({ _id: id }, function(err){
    if(err){
      res.render('error', {
        message: "Cant delete " + id,
        error: err,
        user: req.user
      })
    } else {

     req.flash('Order_complete', 'Your Order is Cancelled Please Place new Order')
      res.redirect('/products');
    }
  })
})



router.get('/deletep/:id', function(req, res, next){
  var id = req.params.id;

  // get rid of the unwanted car. We like new things
  Product.remove({ _id: id }, function(err){
    if(err){
      res.render('error', {
        message: "Cant delete " + id,
        error: err,
        user: req.user
      })
    } else {

     req.flash('Order_complete', 'this Product is deleted')
      res.redirect('/products');
    }
  })
})
module.exports = router;
