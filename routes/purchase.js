var express = require('express');
var router = express.Router();
var con= require('./../DBModels/connection');
var model= require('./../DBModels/Models');
var connect=con.connect();
var app=express();
var bodyParser =require('body-parser');
var async=require('async');

var id,sql,invoice_no,date,ba_id,company_id,amount,taxes,overhead_charges,is_credit;

router.get('/',function(req,res){
    var sql="SELECT * FROM purchase_masters";
    connect.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.end(JSON.stringify(result));
    });
});

router.get('/loadBA',function(req,res){
    var sql="SELECT ba_id,name FROM business_associates WHERE is_customer=0";
    connect.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.end(JSON.stringify(result));
    });
});

router.get('/loadCOMPANY',function(req,res){
    var sql="SELECT company_id,name FROM company_masters";
    connect.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.end(JSON.stringify(result));
    });
});

router.post('/insert',function(req,res){
    invoice_no=req.body.invoice_no;
    date=req.body.date;
    ba_id=req.body.ba_id;
    company_id=req.body.company_id;
    amount=req.body.amount;
    taxes=req.body.taxes;
    overhead_charges=req.body.overhead_charges;
    is_credit=req.body.is_credit;
    
    async.series([
        function(callback){
            sql="START TRANSACTION";
            console.log(sql);
            connect.query(sql, function (err, result) {
                if (err) throw err;
                id=result.insertId;
                //console.log(id);
                callback(null,'succes1');    
            });
        },
        function(callback){
            sql="INSERT INTO purchase_masters(invoice_no,date,ba_id,company_id,amount,taxes,overhead_charges,is_credit) values ('"+invoice_no+"','"+date+"',"+ba_id+","+company_id+","+amount+","+taxes+","+overhead_charges+","+is_credit+");";
            console.log(sql);
            connect.query(sql, function (err, result) {
                if (err) throw err;
                id=result.insertId;
                //console.log(id);
                callback(null,'succes2');    
            });
        },
        function(callback){
            sqlSub="INSERT INTO purchase_details(purchase_master_id,item_detail_id,rate,quantity,cgst,sgst,igst) values ("+id+",2,50,25,5,5,0);";
            console.log(sqlSub);
            connect.query(sqlSub, function (err, result) {
                if (err) throw err;
                callback(null,'success3');
            });
        },
        function(callback){
            sqlSub="COMMIT";
            console.log(sqlSub);
            connect.query(sqlSub, function (err, result) {
                if (err) throw err;
                callback(null,'success4');
            });
        }
    ],
    function(){
        res.end('success');
    });
});

/*router.post('/delete',function(req,res){
    transport_id=req.body.transport_id;
    
    sql="DELETE FROM transport_masters WHERE transport_id="+transport_id+"";
        console.log(sql);
        connect.query(sql, function (err, result) {
        if (err) throw err;
        res.end("success");
    });
});
*/
module.exports = router;