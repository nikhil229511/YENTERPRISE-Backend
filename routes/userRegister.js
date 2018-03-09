var express = require('express');
var router = express.Router();
var con= require('./../DBModels/connection');
var model= require('./../DBModels/Models');
var connect=con.connect();
var app=express();
var bodyParser =require('body-parser');

var username='abc',password='abc',fName='abc',lName='abc';
var user_type='admin',financialYear='2017';

router.get('/',function(req,res){
  res.render('userRegister',);
});

router.post('/',function(req,res){
    
    model.loginMaster().create({
        username:username,
        password:password,
        fName:fName,
        lName:lName,
        user_type:user_type,
        financialYear:financialYear
    }).then(function(err){
        console.log('created User');
    });
});
module.exports = router;