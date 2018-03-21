var express = require('express');
var router = express.Router();
var con= require('./../DBModels/connection');
var model= require('./../DBModels/Models');
var connect=con.connect();
var app=express();
var bodyParser =require('body-parser');

var statecode,name,add1,add2,PIN,logo,state,contactno,GSTNO;

router.get('/',function(req,res){
  //res.render('users',);
  model.companyMaster().findAll().then(function(result,err){
    if(err)
    res.end('Error: '+err);
    
    if(result[0]==null){
        console.log('null');
        res.end('Null Response');
    }
    else
        res.end(JSON.stringify(result));
    });
});

router.post('/',function(req,res){
    
    name=req.body.name;
    add1=req.body.add1;
    add2=req.body.add2;
    PIN=req.body.PIN;
    state=req.body.state;
    statecode=req.body.statecode;
    GSTNO=req.body.GSTNo;
    contactno=req.body.contactno;
    logo=req.body.logo;

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