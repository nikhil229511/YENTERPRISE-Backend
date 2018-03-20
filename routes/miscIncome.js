var express = require('express');
var router = express.Router();
var con= require('./../DBModels/connection');
var model= require('./../DBModels/Models');
var connect=con.connect();
var app=express();
var bodyParser =require('body-parser');

var date='2017-11-11',miscitemid=1,comid=1,amount=100.50,des='test description';

router.get('/',function(req,res){
  //res.render('users',);
  model.MiscIncome().findAll().then(function(result,err){
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
    
    model.MiscIncome().create({
        date:date,
        misc_item_id:miscitemid,
        company_id:comid,
        amount:amount,
        description:des        
    }).then(function(err){
        console.log('created Misc income');
    });
});
module.exports = router;