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
    if (err) throw err;
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
    if (err) throw err;
    res.end("success");
    });
});

router.post('/delete',function(req,res){
    
    id=req.body.user_id;
    var sql="DELETE FROM login_masters WHERE user_id="+id+"";
    console.log(sql);
    connect.query(sql, function (err, result) {
    if (err) throw err;
    res.end("success");
    });
});
module.exports = router
