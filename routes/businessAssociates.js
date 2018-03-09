var express = require('express');
var router = express.Router();
var con= require('./../DBModels/connection');
var model= require('./../DBModels/Models');
var connect=con.connect();
var app=express();
var bodyParser =require('body-parser');

var name='abc',add1='abc',add2='abc',PIN='abc';
var state_code='admin',GSTNO='2017',cno='1234567890',email='abc@abc.abc';
var isCus=false;

router.get('/',function(req,res){
    model.BusinessAssociates().findAll().then(function(result,err){
        if(err)
        throw err;
      
        if(result[0]==null){
          console.log('null');
          return null;
        }
        else{
            res.end(JSON.stringify(result));
        }
      });
});

router.post('/',function(req,res){
    
    model.BusinessAssociates().create({
        name:name,
        add1:add1,
        add2:add2,
        PIN:PIN,
        statecode:state_code,
        GSTNo:GSTNO,
        contactno:cno,
        email:email,
        is_customer:isCus,
    }).then(function(err){
        console.log('created Business Associates');
    });
    res.end();
});
module.exports = router;