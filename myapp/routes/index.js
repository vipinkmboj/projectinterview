var express = require('express');
var router = express.Router();

var customerModel = require('../models/customersignupschema');

//encrypt passwords using bcrypt
var bcrypt = require('bcryptjs');

// jwt require
//var jwt = require('jsonwebtoken');

//Middleware for existing Email check
function checkExistingEmail(req, res, next) {
  
  var getCustomerData = customerModel.findOne({Email: req.body.email});
  getCustomerData.exec((err, customerData) => {
    if(err) throw err;
    if(customerData != null) {
      return res.render('index', { title: 'Project Interview', msg: 'Email Already Exists, Try Another One' });

    }
    next();
  });
}

//Middleware for existing mobile number check
function checkExistingMobileNumber(req, res, next) {
  
  var getCustomerData = customerModel.findOne({Mobilenumber: req.body.mobilenumber});
  getCustomerData.exec((err, customerData) => {
    if(err) throw err;
    if(customerData != null) {
      return res.render('index', { title: 'Project Interview', msg: 'Mobile Number Already Exists, Try Another One' });

    }
    next();
  });
}

//Middleware for existing usename check
function checkExistingUsername(req, res, next) {
  
  var getCustomerData = customerModel.findOne({Username: req.body.username});
  getCustomerData.exec((err, customerData) => {
    if(err) throw err;
    if(customerData != null) {
      return res.render('index', { title: 'Project Interview', msg: 'Username Already Exists, Try Another One' });

    }
    next();
  });
}



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Project Interview', msg: '' });
});

//sign up code
router.post('/signup', checkExistingEmail, checkExistingMobileNumber, checkExistingUsername, function(req, res, next) {

var password = req.body.password;
var confirmPassword = req.body.confirmpassword;
if(password != confirmPassword) {
  res.render('index', { title: 'Project Interview', msg: 'Password didn not match' });

} else {
  var customerDetails = new customerModel({
    FullName: req.body.fullname,
    Email: req.body.email,
    Mobilenumber: req.body.mobilenumber,
    Username: req.body.username,
    Password: bcrypt.hashSync(req.body.password, 10)
  });

  customerDetails.save((err) => {
    if(err) {
      res.render('index', { title: 'Project Interview', msg: 'Some Error Occurred, Please Try again later!' });
    } else {
      res.render('index', { title: 'Project Interview', msg: 'Sign Up Successfull! You may login now' });
  
    }
  });
}

  });


  // Sign in code
  router.post('/signin', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var checkUserNameInCustomerData = customerModel.findOne({Username: username});

    checkUserNameInCustomerData.exec((err, customerData) => {
      if(err) throw err;
      if(customerData != null) {
        var getPasswordFromCustomersData = customerData.Password;

        if(bcrypt.compareSync(password, getPasswordFromCustomersData)) {
          req.session.customerLoginUserName = username;
          res.redirect('/dashboardcustomer');
        } else {
          res.render('/', { title: 'Project Interview', msg: 'Incorrect Password Entered' });
  
        }
      }
    });
  });


  //Sign out
  router.post("/signout", function(req, res, next) {
    req.session.destroy(function(err) {
      if(err) {
        res.redirect('/');
      } else {
        res.render('signout', { title: 'Project Interview', msg:'Signed Out Succesfully! See You Soon' });
  
      } 
    });   
    })


  /*
  router.post('/sigin', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

   
    customerModel.find({Username: username}).exec((err, customerData) => {
      if(err) {
        res.render('index', { title: 'Project Interview', msg: 'Sign in Error, Please try again' });

      } 
      if(customerData != null) {
       //Get Password from database
       var getPasswordFromCustomersData = customerData.Password; 
       //Get User Id from database to use in jwt
       var getUserIDFromCustomersData = customerData._id;
       if(bcrypt.compareSync(password, getPasswordFromCustomersData)) {
        var customerToken = jwt.sign({userID: getUserIDFromCustomersData}, process.env.CUSTOMER_LOGIN_TOKEN_ACCESS_KEY) /*, {expiresIn: 600 /*86400 = 24 hours}*/
/*
          
       
          res.redirect('dashboardcustomer');
          //res.render('index', { title: 'Project Interview', msg: 'Sign in Successful' });

        }
       
        //
        
        //
      } else {
        res.render('index', { title: 'Project Interview', msg: 'Invalid Username' });

      }
    })
  });
*/



module.exports = router;
