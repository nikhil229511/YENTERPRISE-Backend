var express = require('express');
var router = express.Router();
var con= require('./../DBModels/connection');
var model= require('./../DBModels/Models');
var connect=con.connect();
var app=express();
var bodyParser =require('body-parser');

var date,miscitemid,comid,amount,des,sql;

router.get('/',function(req,res){
    var sql="SELECT * FROM misc_incomes";
    connect.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.end(JSON.stringify(result));
    });
});

router.post('/insert',function(req,res){
    date=req.body.date;
    miscitemid=req.body.misc_item_id;
    comid=req.body.company_id;
    amount=req.body.amount;
    des=req.body.description;
    
    sql="INSERT INTO misc_incomes(date,misc_item_id,company_id,amount,description) values ('"+date+"',"+miscitemid+","+comid+","+amount+",'"+des+"')";
        console.log(sql);
        connect.query(sql, function (err, result) {
        if (err) throw err;
        res.end("success");
    });

});

router.post('/delete',function(req,res){
    
    misc_income_id=req.body.misc_income_id;
    
    sql="DELETE FROM misc_incomes WHERE misc_income_id="+misc_income_id+"";
        console.log(sql);
        connect.query(sql, function (err, result) {
        if (err) throw err;
        res.end("success");
    });

});

module.exports = router;