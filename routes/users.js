var express = require('express');
var router = express.Router();
var con= require('./../DBModels/connection');
var model= require('./../DBModels/Models');
var connect=con.connect();
var app=express();
var bodyParser =require('body-parser');

var username,password,fName,lName,user_type,financialYear;

router.get('/',function(req,res){
    var sql="SELECT * FROM login_masters";
    connect.query(sql, function (err, result, fields) {
       // console.log(result.length);
       res.contentType('application/json')
        if (err || result.length == 0){
        
        res.writeHead(401);
        res.end();
    }
    res.end(JSON.stringify(result));
    });
});

router.post('/',function(req,res){
    username=req.body.user.username;
    password=req.body.user.password;
    fName=req.body.user.fName;
    lName=req.body.user.lName;
    user_type=req.body.user.user_type;

    var sql="INSERT INTO login_masters(username,password,fName,lName,user_type) values ('"+username+"','"+password+"','"+fName+"','"+lName+"','"+user_type+"')";
    console.log(sql);
    connect.query(sql, function (err, result) {
        if (err || result.length == 0){
        
            res.writeHead(401);
            res.end();
        }
        res.writeHead(200);
        res.end();
    });
});

router.put('/:user_id',function(req,res){
    //console.log(req.params.user_id);
    username=req.body.user.username;
    password=req.body.user.password;
    fName=req.body.user.fName;
    lName=req.body.user.lName;
    user_type=req.body.user.user_type;
    //user_id=req.body.user.user_id;

    sql="UPDATE login_masters set username='"+username+"',password='"+password+"',fName='"+fName+"',lName='"+lName+"',user_type='"+user_type+"' WHERE user_id="+req.params.user_id+"";
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

router.delete('/:user_id',function(req,res){
    //console.log(req.params.user_id);
    var sql="DELETE FROM login_masters WHERE user_id="+req.params.user_id+";";
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
module.exports = router
