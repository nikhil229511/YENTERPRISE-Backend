var express = require('express');
var router = express.Router();
var con= require('./../DBModels/connection');
var model= require('./../DBModels/Models');
var connect=con.connect();
var app=express();
var bodyParser =require('body-parser');
var username,password;

router.get('/',function(req,res){
  //res.render('login',{title:'login Page'});
  res.end('success');
});

router.post('/',function(req,res){
    
  res.end('{"user_id":1,"username":"admin","password":"admin123","fName":"Jayesh","lName":"Doshi","user_type":"admin","financialYear":"2018-01-01","createdAt":"2018-01-01T00:00:00.000Z","updatedAt":"2018-01-01T00:00:00.000Z"}');
 /*   username=req.body.username;
      password=req.body.password;
    model.loginMaster().findAll({ where: { username: username, password:password } }).then(function(result,err){
      if(err)
      throw err;
    
      if(result[0]==null){
        console.log('null');
        return null;
      }
      else{
        //console.log(result[0]);
        console.log('connected');
        res.end(JSON.stringify(result[0]));
      }
    });*/
});
module.exports = router;