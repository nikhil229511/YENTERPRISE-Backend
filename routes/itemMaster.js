var express = require('express');
var router = express.Router();
var con= require('./../DBModels/connection');
var model= require('./../DBModels/Models');
var connect=con.connect();
var app=express();
var bodyParser =require('body-parser');

var name,hsn,description;

router.get('/',function(req,res){
  //res.render('users',);
  model.ItemMaster().findAll().then(function(result,err){
    if(err)
        res.end('Error: '+err);
    
    if(result[0]==null){
        res.end('Null ');
    }
    else
        res.end(JSON.stringify(result));
    });
});

router.post('/',function(req,res){
    name=req.body.item_master_name;
    hsn=req.body.hsn_code;
    description=req.body.description; 
    
    model.ItemMaster().create({
        item_master_name:name,
        hsn_code:hsn,
        description:description        
    }).then(function(err){
        console.log('created Master Item');
    });
});
module.exports = router;