var express = require('express');
var router = express.Router();
var con= require('./../DBModels/connection');
var model= require('./../DBModels/Models');
var connect=con.connect();
var app=express();
var bodyParser =require('body-parser');

var sql,name,add1,add2,PIN,state_code,state,GSTNo,contactno,email;

router.get('/',function(req,res){
    var sql="SELECT * FROM purchase_masters";
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
    state=req.body.state;
    statecode=req.body.statecode;
    GSTNo=req.body.GSTNo;
    contactno=req.body.contactno;
    email=req.body.email;

    sql="INSERT INTO transport_masters(name,add1,add2,PIN,state,statecode,GSTNo,contactno,email) values ('"+name+"','"+add1+"','"+add2+"','"+PIN+"','"+state+"','"+statecode+"','"+GSTNo+"','"+contactno+"','"+email+"')";
        console.log(sql);
        connect.query(sql, function (err, result) {
        if (err) throw err;
        res.end("success");
    });
});

router.post('/delete',function(req,res){
    transport_id=req.body.transport_id;
    
    sql="DELETE FROM transport_masters WHERE transport_id="+transport_id+"";
        console.log(sql);
        connect.query(sql, function (err, result) {
        if (err) throw err;
        res.end("success");
    });
});

module.exports = router;