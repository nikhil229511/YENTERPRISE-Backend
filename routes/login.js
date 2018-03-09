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
    
 // res.end('success');
  /*username=req.body.username;
    password=req.body.password;*/
    username='admin';
    password='admin123';

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
        //res.end(JSON.stringify(result[0]));
        res.end({"user_id":1,"username":"admin","password":"admin123","fName":"admin","lName":"admin","user_type":"admin","financialYear":"2017","createdAt":"2018-03-15T00:00:00.000Z","updatedAt":"2018-03-15T00:00:00.000Z"});
      }
    });
});
module.exports = router;