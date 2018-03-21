var express = require('express');
var router = express.Router();
var con= require('./../DBModels/connection');
var model= require('./../DBModels/Models');
var connect=con.connect();
var app=express();
var bodyParser =require('body-parser');

var name,add1,add2,PIN,state_code,state,GSTNo,contactno,email,is_customer;

router.get('/',function(req,res){
    model.BusinessAssociates().findAll().then(function(result,err){
        if(err)
        res.end('Error: '+err);
        
        if(result[0]==null)
            res.end('Null');
        else
            res.end(JSON.stringify(result));
    });
});

router.post('/',function(req,res){
    
    model.BusinessAssociates().create({
        name:req.body.name,
        add1:req.body.add1,
        add2:req.body.add2,
        PIN:req.body.PIN,    
        statecode:req.body.state_code,
        GSTNo:req.body.GSTNo,
        contactno:req.body.contactno,
        email:req.body.email,
        state:req.body.state,
        is_customer:req.body.is_customer,
    }).then(function(err){
        console.log('created Business Associates');
    });
    res.end('success');
});

module.exports = router;