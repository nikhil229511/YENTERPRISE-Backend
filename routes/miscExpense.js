var express = require('express');
var router = express.Router();
var con= require('./../DBModels/connection');
var model= require('./../DBModels/Models');
var connect=con.connect();
var app=express();
var bodyParser =require('body-parser');

var date,miscitemid,comid,amount,des,sql;

router.get('/',function(req,res){
    var sql="SELECT * FROM misc_expenses";
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
    
    sql="INSERT INTO misc_expenses(date,misc_item_id,company_id,amount,description) values ('"+date+"',"+miscitemid+","+comid+","+amount+",'"+des+"')";
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

router.put('/:misc_expense_id',function(req,res){
    date=req.body.date;
    miscitemid=req.body.misc_item_id;
    comid=req.body.company_id;
    amount=req.body.amount;
    description=req.body.description;
    misc_expense_id=req.params.misc_expense_id;
    sql="UPDATE misc_expenses set date='"+date+"',misc_item_id="+miscitemid+",company_id="+comid+",amount="+amount+",description='"+description+"' WHERE misc_expense_id="+misc_expense_id+"";
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

router.delete('/:misc_expense_id',function(req,res){
    
    misc_expense_id=req.params.misc_expense_id;
    
    sql="DELETE FROM misc_expenses WHERE misc_expense_id="+misc_expense_id+"";
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