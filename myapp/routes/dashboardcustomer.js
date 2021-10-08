var express = require('express');
var router = express.Router();

var productDataModel = require('../models/productdataschema');
/* GET home page. */
router.get('/', function(req, res, next) {
    var loginUser = req.session.customerLoginUserName
    if(loginUser) {

        var productDataFromDataBase = productDataModel.find({Username: loginUser});
        productDataFromDataBase.exec((err, productData) => {
            if(err) {
                res.render('dashboardcustomer', { title: 'Project Interview', msg: '', loginUser: loginUser, productData: ''});

            } if(productData != null) {
                res.render('dashboardcustomer', { title: 'Project Interview', msg: '', loginUser: loginUser, productData: ''});

            } else {

                res.render('dashboardcustomer', { title: 'Project Interview', msg: 'No Data Available', loginUser: loginUser, productData: productData });

            } 
        });
        //res.render('dashboardcustomer', { title: 'Project Interview', msg: '', loginUser: loginUser });
    } else {
        res.redirect('/');
        //res.render('index', { title: 'Project Interview', msg: '' });

    }
  
});

module.exports = router;
