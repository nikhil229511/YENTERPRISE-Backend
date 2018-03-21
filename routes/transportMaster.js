var express = require('express');
var router = express.Router();
var con= require('./../DBModels/connection');
var model= require('./../DBModels/Models');
var connect=con.connect();
var app=express();
var bodyParser =require('body-parser');

var name,add1,add2,PIN,state_code,state,GSTNo,contactno,email,is_customer;

router.get('/',function(req,res){
    model.TransportMaster().findAll().then(function(result,err){
        if(err)
        res.end('Error: '+err);
        
        if(result[0]==null)
            res.end('Null');
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
    statecode=req.body.state_code;
    GSTNo=req.body.GSTNo;
    contactno=req.body.contactno;
    email=req.body.email;
    is_customer=req.body.is_customer;

    model.TransportMaster().create({
        name:name,
        add1:add1,
        add2:add2,
        PIN:PIN,
        state:state,
        statecode:state_code,
        GSTNo:GSTNo,
        contactno:contactno,
        email:email,
        is_customer:is_customer,
    }).then(function(err){
        console.log('created Business Associates');
    });
    res.end();
});
module.exports = router;