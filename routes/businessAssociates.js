var express = require('express');
var router = express.Router();
var con= require('./../DBModels/connection');
var model= require('./../DBModels/Models');
var connect=con.connect();
var app=express();
var bodyParser =require('body-parser');
var sql,name,add1,add2,PIN,state_code,state,GSTNo,contactno,email,is_customer;

router.get('/',function(req,res){
    var sql="SELECT * FROM business_associates";
    connect.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.end(JSON.stringify(result));
    });
});

router.post('/insert',function(req,res){
    name=req.body.name;
    add1=req.body.add1;
    add2=req.body.add2;
    PIN=req.body.PIN;
    statecode=req.body.statecode;
    GSTNo=req.body.GSTNo;
    contactno=req.body.contactno;
    email=req.body.email;
    state=req.body.state;
    is_customer=req.body.is_customer;
    
        sql="INSERT INTO business_associates(name,add1,add2,PIN,state,statecode,GSTNo,contactno,email,is_customer) values ('"+name+"','"+add1+"','"+add2+"','"+PIN+"','"+state+"','"+statecode+"','"+GSTNo+"','"+contactno+"','"+email+"','"+is_customer+"')";
        console.log(sql);
        connect.query(sql, function (err, result) {
        if (err) throw err;
        res.end("success");
        });
});

router.post('/delete',function(req,res){
    ba_id=req.body.ba_id;
    
    sql="DELETE FROM business_associates WHERE ba_id="+ba_id+"";
    console.log(sql);
    connect.query(sql, function (err, result) {
    if (err) throw err;
    res.end("success");
    });
});

module.exports = router;