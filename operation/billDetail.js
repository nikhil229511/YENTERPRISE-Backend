var express = require('express');
var moment=require('moment');
var router = express.Router();
var con= require('./../DBModels/connection');
var model= require('./../DBModels/Models');
var connect=con.connect();
var app=express();
var async=require('async');
var bodyParser =require('body-parser');

var sql,statecode,name,add1,add2,PIN,logo,email,state,contactno,GSTNO;
var totalSum=0,amountPaid,amount_due;
var dispatch,Return,rent;
var resObj={};

router.get('/:invoice_no',function(req,res){
    res.contentType('application/json');
    async.series([
    //rent
    function(callback){
    var sql="SELECT * FROM rent_masters WHERE invoice_no = "+req.params.invoice_no+"";
        connect.query(sql, function (err, result, fields) {
            if (err || result.length == 0){
                res.writeHead(401);
                res.end();
            }
            else{
                var lenOuter=parseInt(result.length);
                result.forEach(element => {
                    getRentedItems(element,function(data){
                        element.rentedItems=data;
                        lenOuter=parseInt(lenOuter)-1;
                        if (lenOuter === 0)
                            resObj.rent=result;                    
                    });        
                });                                       
            }            
            callback(null,res);
        });
    
    },
    //dispatch
    function(callback){
        var sql="SELECT * FROM dispatch_master_histories WHERE invoice_no = "+req.params.invoice_no+"";
        connect.query(sql, function (err, result, fields) {
            if (err || result.length == 0){
                res.writeHead(401);
                res.end();
            }
            else{
                var lenOuter=parseInt(result.length);
                result.forEach(element => {
                    getDispatchedItems(element,function(data){
                        element.dispatchedItems=data;
                        lenOuter=parseInt(lenOuter)-1;
                        if (lenOuter === 0)
                            resObj.dispatch=result;                    
                    });        
                });                                       
            }            
            callback(null,res);
        });
        
    },
    //return
    function(callback){
        var sql="SELECT * FROM return_master_histories WHERE invoice_no = "+req.params.invoice_no+"";
        connect.query(sql, function (err, result, fields) {
            if (err || result.length == 0){
                res.writeHead(401);
                res.end();
            }
            else{
                var lenOuter=parseInt(result.length);
                result.forEach(element => {
                    getReturnedItems(element,function(data){
                        element.returnedItems=data;
                        lenOuter=parseInt(lenOuter)-1;
                        if (lenOuter === 0){                            
                            resObj.return=result;
                            res.write(JSON.stringify(resObj));
                            calculateRent();
                            res.end();
                        }                                        
                    });        
                });           
            }                        
        });   
    }
  ],       
  //callback
  function(){});
});


/*function calculateRent(){
    //console.log(resObj);
    var ditemid,dqty,ritemid,rqty,rate;
    var days=calculateDays(resObj.dispatch[0].date,resObj.return[0].date);
    //console.log(calculateDays(resObj.dispatch[0].date,resObj.return[0].date));
    resObj.dispatch[0].dispatchedItems.forEach(element=>{
        ditemid=element.item_detail_id;
        dqty=element.quantity;
        console.log('item: '+ditemid);
        console.log('qty: '+dqty);
    });

    resObj.return[0].returnedItems.forEach(element=>{
        ritemid=element.item_detail_id;
        rqty=element.quantity;
        console.log('ritem: '+ritemid);
        console.log('rqty: '+rqty);
    });

    var rate= resObj.rent[0].rentedItems[0].rate;
    console.log('rate: '+rate);
    var rent=rate*days*rqty;
    console.log('rent: '+rent);
    console.log('days: '+days);
}*/
function calculateRent(){
    var days,ditemid,dqty,ritemid,rqty,rate;
    //var days=calculateDays(resObj.dispatch[0].date,resObj.return[0].date);
    var total=0;
var return_id=0;
    //itrate through all the dispatch main items
    for(var i=resObj.dispatch.length-1;i>=0;i--){
        //itrate throush dispatched item list in each bill of dispatch
        for(var j=resObj.dispatch[i].dispatchedItems.length-1 ;j>=0;j--){
            
            //check for item detail
            if(resObj.dispatch[i].dispatchedItems[j].item_detail_id==resObj.return[return_id].returnedItems[0].item_detail_id){
                
                days=calculateDays(resObj.dispatch[i].date,resObj.return[return_id].date);
                rate=resObj.rent[0].rentedItems[0].rate;
                
                //set rqty min of diapatched quantity and returned quantity
                rqty = (resObj.return[return_id].returnedItems[0].quantity)>resObj.dispatch[i].dispatchedItems[j].quantity?resObj.dispatch[i].dispatchedItems[j].quantity:resObj.return[return_id].returnedItems[0].quantity;
                
                //subtract returned quantity from both returned and dispatch bill detail.
                resObj.return[return_id].returnedItems[0].quantity -= rqty;
                resObj.dispatch[i].dispatchedItems[j].quantity -= rqty;

                // console.log(resObj.return[return_id].returnedItems[0].quantity+"-------"+resObj.dispatch[i].dispatchedItems[j].quantity+"------"+rqty);
                
                //if dispatched quantity is not yet returned increment j to 
                //again search in same dispatch bill
                if(resObj.dispatch[i].dispatchedItems[j].quantity > 0)
                    //i++ should be there?
                    j++;
                var rent=rate*days*rqty;
                console.log('rent: '+rent);
                console.log('days: '+days);
                total+=rent;
                
            }  
            //if return item is 0 i.e. all items has been returned        
            if(resObj.return[return_id].returnedItems[0].quantity <= 0)
            {
                //if return bill are still available till date 
                //incement return bill counter else print bill amount.
                if(return_id < (resObj.return.length-1))
                    return_id++;                    
                else{
                    console.log("Total bill : "+total);
                    return true;
                }                    
            }  
        }
    }
    
    
    
    
    
    /*resObj.dispatch[0].dispatchedItems.forEach(element=>{
        ditemid=element.item_detail_id;
        dqty=element.quantity;
        console.log('item: '+ditemid);
        console.log('qty: '+dqty);
    });

    resObj.return[0].returnedItems.forEach(element=>{
        ritemid=element.item_detail_id;
        rqty=element.quantity;
        console.log('ritem: '+ritemid);
        console.log('rqty: '+rqty);
    });*/
    
}


function calculateDays(startDate,endDate)
{
   var start_date = moment(startDate, 'YYYY-MM-DD ');
   var end_date = moment(endDate, 'YYYY-MM-DD');
   var duration = moment.duration(end_date.diff(start_date));
   return duration.asDays();       
}

function getRentedItems(element,callback){
    var sql1="SELECT * FROM rent_details WHERE rent_master_id="+element.rent_master_id+"";
    connect.query(sql1, function (err, result1, fields) {
        if (err || result1.length == 0)
            return null;
        else
            callback(result1);                     
    });
}

function getDispatchedItems(element,callback){
    var sql1="SELECT * FROM dispatch_detail_histories WHERE dispatch_master_id="+element.dispatch_master_id+"";
    connect.query(sql1, function (err, result1, fields) {
        if (err || result1.length == 0)
            return null;
        else
            callback(result1);                     
    });
}

function getReturnedItems(element,callback){
    var sql1="SELECT * FROM return_detail_histories WHERE return_master_id="+element.return_master_id+"";
    connect.query(sql1, function (err, result1, fields) {
        if (err || result1.length == 0)
            return null;
        else
            callback(result1);                     
    });
}

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