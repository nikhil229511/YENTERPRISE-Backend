var express = require('express');
var router = express.Router();
var con= require('./../DBModels/connection');
var model= require('./../DBModels/Models');
var connect=con.connect();
var app=express();
var bodyParser =require('body-parser');
var username,password;

router.get('/',function(req,res){
  res.end('success');
});

router.post('/',function(req,res){
    username=req.body.username;
    password=req.body.password;

    var sql="SELECT * FROM login_masters WHERE username='"+username+"' and password='"+password+"'";
    connect.query(sql, function (err, result, fields) {
      if (err)
        res.end('Unsuccessful');
      res.end(JSON.stringify(result));
    });
});
module.exports = router;