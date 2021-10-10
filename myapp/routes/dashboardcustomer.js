var express = require('express');
var router = express.Router();

var productDataModel = require('../models/productdataschema');
/* GET home page. */
router.get('/', function(req, res, next) {
    var loginUser = req.session.customerLoginUserName
    if(loginUser) {

        // Pagination
        let { page, size } = req.query;
        if(!page) {
            page = 1;
        }
        if(!size) {
            size = 3;
        }
        const limit = parseInt(size);
        const skip = (page - 1)*size;


        const productDataFromDataBase = productDataModel.find({Username: loginUser}).limit(limit).skip(skip);
        //

        //var productDataFromDataBase = productDataModel.find({Username: loginUser});
        productDataFromDataBase.exec((err, productData) => {
            if(err) {
                res.render('dashboardcustomer', { title: 'Project Interview', msg: '', loginUser: loginUser, productData: ''});

            } if(productData != null) {
                res.render('dashboardcustomer', { title: 'Project Interview', msg: '', loginUser: loginUser, productData: productData});

            } else {

                res.render('dashboardcustomer', { title: 'Project Interview', msg: 'No Data Available', loginUser: loginUser, productData: '' });

            } 
        });
        //res.render('dashboardcustomer', { title: 'Project Interview', msg: '', loginUser: loginUser });
    } else {
        res.redirect('/');
        //res.render('index', { title: 'Project Interview', msg: '' });

    }
  
});

module.exports = router;
