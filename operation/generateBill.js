var express = require('express');
var router = express.Router();
var con= require('./../DBModels/connection');
var model= require('./../DBModels/Models');
var connect=con.connect();
var app=express();
var async=require('async');
var bodyParser =require('body-parser');

var sql,statecode,name,add1,add2,PIN,logo,email,state,contactno,GSTNO;
var totalSum=0,amountPaid,amount_due;
router.get('/:ba_id',function(req,res){
  async.series([
    function(callback){
        var sql="SELECT * FROM rent_masters WHERE ba_id="+req.params.ba_id+"";
        //console.log(sql);
        connect.query(sql, function (err, result, fields) {
            if (err || result.length == 0){
                res.writeHead(401);
                res.end();
            }else{
                result.forEach(element => {
                    sum=0;
                    sum=element.amount+element.taxes+element.loading_charges+element.unloading_charges+element.transport_charges;
                    totalSum += sum;
                    element.total_amount=sum;
                });
                res.write(JSON.stringify(result));
                callback(null,'succes1');           
            }
        });
        
    },
    function(callback){
        var sql="SELECT SUM(amount) as amount_paid  FROM cashflows WHERE ba_id="+req.params.ba_id+" and is_payment=0";
        connect.query(sql, function (err, result, fields) {
            if (err || result.length == 0){
                res.writeHead(401);
                res.end();
            }else{
                amountPaid=result[0].amount_paid;
                amount_due=totalSum-amountPaid;
                callback(null,'succes2');
            }
        });            
    },
    function(callback){
        var obj={'grand_total':totalSum,'amount_paid':amountPaid,"amount_due":amount_due};
        console.log(JSON.stringify(obj));
        res.write(JSON.stringify(obj));
        res.end();
    }
  ],       
  //callback
  function(){});
});



/*router.post('/',function(req,res){
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
});/

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
*/
module.exports = router;