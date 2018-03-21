var express = require('express');
var router = express.Router();
var con= require('./../DBModels/connection');
var model= require('./../DBModels/Models');
var connect=con.connect();
var app=express();
var bodyParser =require('body-parser');

var item_master_name,item_master_id,total_items,damaged_items,description;

router.get('/',function(req,res){
model.ItemDetail().findAll(/*{where: {item_master_id: '2'}}*/).then(function(result,err){
    if(err)
    res.end('Error: '+Err);
    
    if(result[0]==null){
        console.log('null');
        res.end('Null');
    }
    else
        res.end(JSON.stringify(result));
    });
});

router.post('/',function(req,res){

    model.ItemDetail().create({
        item_master_name:item_master_name,
        item_master_id:item_master_id,
        total_items:total_items,
        damaged_items:damaged_items,
        description:description        
    }).then(function(err){
        console.log('created Master Item');
    });
});
module.exports = router;