var express = require('express');
var router = express.Router();
var con= require('./../DBModels/connection');
var model= require('./../DBModels/Models');
var connect=con.connect();
var app=express();
var bodyParser =require('body-parser');

var item_name,description,sql;

router.get('/',function(req,res){
    var sql="SELECT * FROM misc_items";
    connect.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.end(JSON.stringify(result));
    });
});

router.post('/insert',function(req,res){
    item_name=req.body.item_name;
    description=req.body.description;
    
    sql="INSERT INTO misc_items(item_name,description) values ('"+item_name+"','"+description+"')";
        console.log(sql);
        connect.query(sql, function (err, result) {
        if (err) throw err;
        res.end("success");
    });
});

router.post('/delete',function(req,res){
    misc_item_id=req.body.misc_item_id;
    
    sql="DELETE FROM misc_items WHERE misc_item_id="+misc_item_id+"";
        console.log(sql);
        connect.query(sql, function (err, result) {
        if (err) throw err;
        res.end("success");
    });
});

module.exports = router;