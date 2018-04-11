var express = require('express');
var router = express.Router();
var con= require('./../DBModels/connection');
var model= require('./../DBModels/Models');
var connect=con.connect();
var app=express();
var bodyParser =require('body-parser');

var sql,name,hsn,description;

router.get('/',function(req,res){
    var sql="SELECT * FROM item_masters";
    res.contentType('application/json')
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
    name=req.body.item_master_name;
    hsn=req.body.hsn_code;
    gst_rate=req.body.gst_rate;
    description=req.body.description; 
    
    sql="INSERT INTO item_masters(item_master_name,hsn_code,gst_rate,description) values ('"+name+"','"+hsn+"',"+gst_rate+",'"+description+"')";
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

router.put('/:item_master_id',function(req,res){
    name=req.body.item_master_name;
    hsn=req.body.hsn_code;
    description=req.body.description; 
    gst_rate=req.body.gst_rate;
    item_master_id=req.body.item_master_id;
    sql="UPDATE item_masters set gst_rate="+gst_rate+",item_master_name='"+name+"',hsn_code="+hsn+",description='"+description+"' WHERE item_master_id="+item_master_id+"";
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

router.delete('/:item_master_id',function(req,res){
    item_master_id=req.params.item_master_id;
    
    sql="DELETE FROM item_masters WHERE item_master_id="+item_master_id+"";
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