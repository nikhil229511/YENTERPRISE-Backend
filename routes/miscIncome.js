var express = require('express');
var router = express.Router();
var con= require('./../DBModels/connection');
var model= require('./../DBModels/Models');
var connect=con.connect();
var app=express();
var bodyParser =require('body-parser');

var date,miscitemid,comid,amount,des,sql;

router.get('/',function(req,res){
    var sql="SELECT i.misc_income_id,i.date,i.misc_item_id,mi.item_name,i.company_id,cm.name,i.amount,i.description FROM misc_incomes i INNER JOIN misc_items mi on mi.misc_item_id=i.misc_item_id INNER JOIN company_masters cm on cm.company_id=i.company_id";
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
    date=req.body.date;
    miscitemid=req.body.misc_item_id;
    comid=req.body.company_id;
    amount=req.body.amount;
    des=req.body.description;
    
    sql="INSERT INTO misc_incomes(date,misc_item_id,company_id,amount,description) values ('"+date+"',"+miscitemid+","+comid+","+amount+",'"+des+"')";
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

router.put('/:misc_income_id',function(req,res){
    date=req.body.date;
    miscitemid=req.body.misc_item_id;
    comid=req.body.company_id;
    amount=req.body.amount;
    description=req.body.description;
    misc_income_id=req.params.misc_income_id;
    
    sql="UPDATE misc_incomes set date='"+date+"',misc_item_id="+miscitemid+",company_id="+comid+",amount="+amount+",description='"+description+"' WHERE misc_income_id="+misc_income_id+"";
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

router.delete('/:misc_income_id',function(req,res){
    
    misc_income_id=req.body.misc_income_id;
    
    sql="DELETE FROM misc_incomes WHERE misc_income_id="+misc_income_id+"";
        console.log(sql);
        connect.query(sql, function (err, result) {
        if (err) 
            res.end('Unsuccessful');
        res.end("success");
    });

});

module.exports = router;