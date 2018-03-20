var express = require('express');
var router = express.Router();
var con= require('./../DBModels/connection');
var model= require('./../DBModels/Models');
var connect=con.connect();
var app=express();
var bodyParser =require('body-parser');

var name='Refreshments',description='test for item master';

router.get('/',function(req,res){
  //res.render('users',);
  model.MiscItem().findAll().then(function(result,err){
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
    
    model.MiscItem().create({
        item_name:name,
        description:description        
    }).then(function(err){
        console.log('created Misc Item');
    });
});
module.exports = router;