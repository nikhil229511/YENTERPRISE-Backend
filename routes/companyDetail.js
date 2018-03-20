var express = require('express');
var router = express.Router();
var con= require('./../DBModels/connection');
var model= require('./../DBModels/Models');
var connect=con.connect();
var app=express();
var bodyParser =require('body-parser');

var name='abc',add1='abc',add2='abc',PIN='395023',logo='img.png';
var statecode='24',state='Gujarat',GSTNO='24AAAABBBBSSSSQ',contactno='0123456789';

router.get('/',function(req,res){
  //res.render('users',);
  model.companyMaster().findAll().then(function(result,err){
    if(err)
        throw err;
    
    if(result[0]==null){
        console.log('null');
        return null;
    }
    else
        res.end(JSON.stringify(result));
    });
});

router.post('/',function(req,res){
    
    model.companyMaster().create({
        name:name,
        add1:add1,
        add2:add2,
        PIN:PIN,
        state:state,
        statecode:statecode,
        GSTNo:GSTNO,
        contactno:contactno,
        logo:logo
    }).then(function(err){
        console.log('created company');
    });
});
module.exports = router;