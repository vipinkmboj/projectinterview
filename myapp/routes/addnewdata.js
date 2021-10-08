var express = require('express');
var router = express.Router();

var productDataModel = require('../models/productdataschema');
/* GET home page. */
router.get('/', function(req, res, next) {
    var loginUser = req.session.customerLoginUserName
    if(loginUser) {
        res.render('addnewdata', { title: 'Project Interview', msg: '', loginUser: loginUser });
    } else {
        res.redirect('/');
        //res.render('index', { title: 'Project Interview', msg: '' });

    }
  
});

router.post('/', function(req, res, next) {
    var loginUser = req.session.customerLoginUserName
    if(loginUser) {

        var productDataDetails = new productDataModel({

            Username: loginUser,
            ProductCategory: req.body.productcategory,
            ProductName: req.body.productname,
            ProductDetail: req.body.productdetail,
            ProductExpiry: req.body.productexpiry,
            ProductPrice: req.body.productprice
            
        });

        productDataDetails.save((err) => {
            if(err) {
                res.render('addnewdata', { title: 'Project Interview', msg: 'Error Occurred,', loginUser: loginUser });

            } else {
                res.render('addnewdata', { title: 'Project Interview', msg: 'Product Data Added Successfully', loginUser: loginUser });

            }
        });

            } else {
        res.redirect('/');
        //res.render('index', { title: 'Project Interview', msg: '' });

    }
  
});

module.exports = router;
