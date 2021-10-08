var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    var loginUser = req.session.customerLoginUserName;
    if(loginUser) {
        res.render('recyclebin', { title: 'Project Interview', msg: '', loginUser: loginUser });
    } else {
      
      res.redirect('/');
    }  
  });


  module.exports = router;