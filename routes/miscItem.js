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
        if (err || result.length == 0){        
            res.writeHead(401);
            res.end();
        }else{
            res.end(JSON.stringify(result));
        }
    });
});

router.post('/',function(req,res){
    item_name=req.body.item_name;
    description=req.body.description;
    
    sql="INSERT INTO misc_items(item_name,description) values ('"+item_name+"','"+description+"')";
        console.log(sql);
        connect.query(sql, function (err, result) {
            if (err || result.length == 0){        
                res.writeHead(401);
                res.end();
            }else{
                res.writeHead(200);
                res.end();
            }
    });
});

router.put('/:misc_item_id',function(req,res){
    item_name=req.body.item_name;
    description=req.body.description;
    misc_item_id=req.params.misc_item_id;
    sql="UPDATE misc_items set item_name='"+item_name+"',description='"+description+"' WHERE misc_item_id="+misc_item_id+"";
    connect.query(sql, function (err, result) {
        if (err || result.length == 0){        
            res.writeHead(401);
            res.end();
        }else{
            res.writeHead(200);
            res.end();
        }
    });
});

router.delete('/:misc_item_id',function(req,res){
    misc_item_id=req.params.misc_item_id;
    
    sql="DELETE FROM misc_items WHERE misc_item_id="+misc_item_id+"";
        console.log(sql);
        connect.query(sql, function (err, result) {
            if (err || result.length == 0){        
                res.writeHead(401);
                res.end();
            }else{
                res.writeHead(200);
                res.end();
            }
    });
});

module.exports = router;