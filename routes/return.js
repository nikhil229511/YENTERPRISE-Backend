var express = require('express');
var router = express.Router();
var con= require('./../DBModels/connection');
var model= require('./../DBModels/Models');
var connect=con.connect();
var app=express();
var bodyParser =require('body-parser');
var async=require('async');

var id,sql,invoice_no,date,ba_id,company_id,amount,taxes,overhead_charges,is_credit,status;

router.get('/',function(req,res){
    var sql="SELECT * FROM return_master_histories";
    connect.query(sql, function (err, result, fields) {
        if (err || result.length == 0){        
            res.writeHead(401);
            res.end();
        }else{
            res.end(JSON.stringify(result));
        }
    });
});

/*router.get('/ba',function(req,res){
    var sql="SELECT ba_id,name FROM business_associates WHERE is_customer=0";
    connect.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.end(JSON.stringify(result));
    });
});

router.get('/company',function(req,res){
    var sql="SELECT company_id,name FROM company_masters";
    connect.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.end(JSON.stringify(result));
    });
});*/

router.post('/',function(req,res){
    
    invoice_no=req.body.invoice_no;
    date=req.body.date;
    
    async.series([
        function(callback){
            sql="START TRANSACTION";
            connect.query(sql, function (err, result) {
                if (err){        
                    res.writeHead(401);
                    res.end();
                }else
                    callback(null,'succes1');    
            });
        },
        function(callback){
            sql="INSERT INTO return_master_histories (invoice_no,date) values ('"+invoice_no+"','"+date+"');";
            connect.query(sql, function (err, result) {
                if (err){        
                    console.log(err);
                    res.writeHead(401);
                    res.end();
                }else{
                    id=result.insertId;
                    callback(null,'succes2');    
                }
            });
        },
        function(callback){
            
            req.body.items.forEach(item => {
                sqlSub="INSERT INTO return_detail_histories(return_master_id,item_detail_id,quantity,damaged_quantity) values ("+id+","+item.item_detail_id+","+item.quantity+","+item.damaged_quantity+");";
                connect.query(sqlSub, function (err, result) {
                    if (err){        
                        res.writeHead(401);
                        res.end();
                    }
                });
            });
            callback(null,'success3');
        },
        function(callback){
            sqlSub="COMMIT";
            connect.query(sqlSub, function (err, result) {
                if (err){        
                    res.writeHead(401);
                    res.end();
                }else
                    callback(null,'success4');
            });
        }
    ],
    function(){
        res.end('success');
    });
});


router.put('/:return_master_id',function(req,res){
    return_master_id=req.params.return_master_id;
    invoice_no=req.body.invoice_no;
    date=req.body.date;
    
    async.series([
        function(callback){
            sql="START TRANSACTION";
            console.log(sql);
            connect.query(sql, function (err, result) {
                if (err){        
                    res.writeHead(401);
                    res.end();
                }else
                    callback(null,'succes1');
            });
        },
        function(callback){
            sql="UPDATE return_master_histories SET invoice_no='"+invoice_no+"',date='"+date+"' WHERE return_master_id="+return_master_id+"";
            connect.query(sql, function (err, result) {
                if (err){        
                    res.writeHead(401);
                    res.end();
                }else
                    callback(null,'succes1');
            });
        },
        function(callback){
            
            req.body.items.forEach(item => {
                sqlSub="UPDATE return_detail_histories SET return_master_id="+return_master_id+",item_detail_id="+item.item_detail_id+",quantity="+item.quantity+",damaged_quantity="+item.damaged_quantity+" WHERE return_master_id="+return_master_id+" AND item_detail_id="+item.item_detail_id+";";
                connect.query(sqlSub, function (err, result) {
                    if (err){
                        console.log(err);        
                        res.writeHead(401);
                        res.end();
                    }                    
                });                
            });
            callback(null,'success3');
        },
        function(callback){
            sqlSub="COMMIT";
            connect.query(sqlSub, function (err, result) {
                if (err){        
                    res.writeHead(401);
                    res.end();
                }else
                    callback(null,'succes1');
            });
        }
    ],
    function(){
        res.end('success');
    });
});



router.delete('/:return_master_id',function(req,res){
    return_master_id=req.params.return_master_id;
    
    async.series([
        function(callback){
            sql="START TRANSACTION";
            console.log(sql);
            connect.query(sql, function (err, result) {
                if (err){        
                    res.writeHead(401);
                    res.end();
                }else{
                    callback(null,'succes1');        
                }                
            });
        },
        function(callback){    
            sqlSub="DELETE FROM return_detail_histories WHERE return_master_id="+return_master_id+";";
            connect.query(sqlSub, function (err, result) {
                if (err){        
                    res.writeHead(401);
                    res.end();
                }else
                callback(null,'success3');
            });            
        },

        function(callback){
            sql="DELETE FROM return_master_histories WHERE return_master_id="+return_master_id+";";
            connect.query(sql, function (err, result) {
                if (err){        
                    res.writeHead(401);
                    res.end();
                }else
                callback(null,'success4');
            });
        },
        function(callback){
            sqlSub="COMMIT";
            console.log(sqlSub);
            connect.query(sqlSub, function (err, result) {
                if (err){        
                    res.writeHead(401);
                    res.end();
                }else
                callback(null,'success3');
            });
        }
    ],
    function(){
        res.end('success');
    });
});
module.exports = router;