var express = require('express');
var router = express.Router();
var con= require('./../DBModels/connection');
var model= require('./../DBModels/Models');
var connect=con.connect();
var app=express();
var bodyParser =require('body-parser');

var username,password,fName,lName,user_type,financialYear;

router.get('/',function(req,res){
  //res.render('users',);
  model.loginMaster().findAll({ where: { user_type: 'staff' } }).then(function(result,err){
    if(err)
    res.end('Error: '+err);
    
    if(result[0]==null)
        res.end('Null');
    else
        res.end(JSON.stringify(result));
    });
});

router.post('/',function(req,res){
    
    username=req.body.username;
    password=req.body.password;
    fName=req.body.fName;
    lName=req.body.lName;
    user_type=req.body.user_type;
    financialYear=req.body.financialYear;

    model.loginMaster().create({
        username:username,
        password:password,
        fName:fName,
        lName:lName,
        user_type:user_type,
        financialYear:financialYear
    }).then(function(err){
        console.log('created User');
    })
})
module.exports = router
