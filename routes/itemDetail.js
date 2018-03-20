var express = require('express');
var router = express.Router();
var con= require('./../DBModels/connection');
var model= require('./../DBModels/Models');
var connect=con.connect();
var app=express();
var bodyParser =require('body-parser');

var name='JACK',hsn='542',description='test for item master';

router.get('/',function(req,res){
  //res.render('users',);
  model.ItemDetail().findAll({where: {item_master_id: '2'}}).then(function(result,err){
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

/*router.post('/',function(req,res){
    
    model.ItemMaster().create({
        item_master_name:name,
        hsn_code:hsn,
        description:description        
    }).then(function(err){
        console.log('created Master Item');
    });
});*/
module.exports = router;