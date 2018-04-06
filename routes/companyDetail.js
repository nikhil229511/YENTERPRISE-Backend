var express = require('express');
var router = express.Router();
var con= require('./../DBModels/connection');
var model= require('./../DBModels/Models');
var connect=con.connect();
var app=express();
var bodyParser =require('body-parser');

var sql,statecode,name,add1,add2,PIN,logo,email,state,contactno,GSTNO;

router.get('/',function(req,res){
    var sql="SELECT * FROM company_masters";
    connect.query(sql, function (err, result, fields) {
        if (err)
            res.end('unsuccessful');
        res.end(JSON.stringify(result));
    });
});

router.post('/',function(req,res){
    name=req.body.name;
    add1=req.body.add1;
    add2=req.body.add2;
    PIN=req.body.PIN;
    state=req.body.state;
    statecode=req.body.statecode;
    GSTNo=req.body.GSTNo;
    contactno=req.body.contactno;
    email=req.body.email;
    logo=req.body.logo;

    sql="INSERT INTO company_masters(name,add1,add2,PIN,state,statecode,GSTNo,contactno,email,logo) values ('"+name+"','"+add1+"','"+add2+"','"+PIN+"','"+state+"','"+statecode+"','"+GSTNo+"','"+contactno+"','"+email+"','"+logo+"')";
        console.log(sql);
        connect.query(sql, function (err, result) {
        if (err) 
            res.end('unsuccessful');
        res.end("success");
    });
});

router.put('/:company_id',function(req,res){
    company_id=req.params.company_id;
    name=req.body.name;
    add1=req.body.add1;
    add2=req.body.add2;
    PIN=req.body.PIN;
    state=req.body.state;
    statecode=req.body.statecode;
    GSTNo=req.body.GSTNo;
    contactno=req.body.contactno;
    email=req.body.email;
    logo=req.body.logo;

    sql="UPDATE company_masters set name='"+name+"',add1='"+add1+"',add2='"+add2+"',PIN='"+PIN+"',state='"+state+"',statecode='"+statecode+"',GSTNo='"+GSTNo+"',contactno='"+contactno+"',email='"+email+"',logo='"+logo+"' WHERE company_id="+company_id+"";
        console.log(sql);
        connect.query(sql, function (err, result) {
        if (err) 
            res.end('unsuccessful');
        res.end("success");
    });
});

router.delete('/company_id',function(req,res){
    company_id=req.params.company_id;

    sql="DELETE FROM company_masters WHERE company_id="+company_id+"";
        console.log(sql);
        connect.query(sql, function (err, result) {
        if (err) 
            res.end('unsuccessful');
        res.end("success");
    });
});
module.exports = router;