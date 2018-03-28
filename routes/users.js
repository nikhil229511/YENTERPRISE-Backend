var express = require('express');
var router = express.Router();
var con= require('./../DBModels/connection');
var model= require('./../DBModels/Models');
var connect=con.connect();
var app=express();
var bodyParser =require('body-parser');

var username,password,fName,lName,user_type,financialYear;

router.get('/',function(req,res){
    var sql="SELECT * FROM login_masters WHERE user_type='admin'";
    connect.query(sql, function (err, result, fields) {
    if (err)
        res.end('Unsuccessful');
    res.end(JSON.stringify(result));
    });
});

router.post('/insert',function(req,res){
    
    username=req.body.username;
    password=req.body.password;
    fName=req.body.fName;
    lName=req.body.lName;
    user_type=req.body.user_type;
    financialYear=req.body.financialYear;

    var sql="INSERT INTO login_masters(username,password,fName,lName,user_type,financialYear) values ('"+username+"','"+password+"','"+fName+"','"+lName+"','"+user_type+"','"+financialYear+"')";
    console.log(sql);
    connect.query(sql, function (err, result) {
    if (err)
        res.end('Unsuccessful');
    res.end("success");
    });
});

router.post('/update',function(req,res){
    
    username=req.body.username;
    password=req.body.password;
    fName=req.body.fName;
    lName=req.body.lName;
    user_type=req.body.user_type;
    financialYear=req.body.financialYear;
    user_id=req.body.user_id;

    sql="UPDATE login_masters set username='"+username+"',password='"+password+"',fName='"+fName+"',lName='"+lName+"',user_type='"+user_type+"',financialYear='"+financialYear+"' WHERE user_id="+user_id+"";
    console.log(sql);
    connect.query(sql, function (err, result) {
    if (err)
        res.end('Unsuccessful');
    res.end("success");
    });
});

router.post('/delete',function(req,res){
    
    id=req.body.user_id;
    var sql="DELETE FROM login_masters WHERE user_id="+id+"";
    console.log(sql);
    connect.query(sql, function (err, result) {
    if (err)
        res.end('Unsuccessful');
    res.end("success");
    });
});
module.exports = router
