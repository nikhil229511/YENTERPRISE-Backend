var express = require('express');
var router = express.Router();
var con= require('./../DBModels/connection');
var model= require('./../DBModels/Models');
var connect=con.connect();
var app=express();
var bodyParser =require('body-parser');
var sql,name,add1,add2,PIN,state_code,state,GSTNo,contactno,email,is_customer;

router.get('/',function(req,res){
    var sql="SELECT * FROM business_associates where is_customer=0";
    connect.query(sql, function (err, result, fields) {
        if (err || result.length == 0){        
            res.writeHead(401);
            res.end();
        }
        else
            res.end(JSON.stringify(result));
    });
});

router.post('/',function(req,res){
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
            if (err || result.length == 0){        
                res.writeHead(401);
                res.end();
            }else{
                res.writeHead(200);
                res.end();
            }
        });
});

router.put('/:ba_id',function(req,res){
    ba_id=req.params.ba_id;
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
    
        sql="UPDATE business_associates set name='"+name+"',add1='"+add1+"',add2='"+add2+"',PIN='"+PIN+"',state='"+state+"',statecode='"+statecode+"',GSTNo='"+GSTNo+"',contactno='"+contactno+"',email='"+email+"',is_customer="+is_customer+" WHERE ba_id="+ba_id+"";
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

router.delete('/:ba_id',function(req,res){
    ba_id=req.params.ba_id;    
    sql="DELETE FROM business_associates WHERE ba_id="+ba_id+"";
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