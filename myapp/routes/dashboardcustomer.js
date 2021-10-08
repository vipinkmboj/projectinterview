var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var loginUser = req.session.customerLoginUserName
    if(loginUser) {
        res.render('dashboardcustomer', { title: 'Project Interview', msg: '', loginUser: loginUser });
    } else {
        res.redirect('index');
        //res.render('index', { title: 'Project Interview', msg: '' });

    }
  
});

module.exports = router;
