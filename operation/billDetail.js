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

function calculateRent(){
    var days,ditemid,dqty,ritemid,rqty,rate;
    //var days=calculateDays(resObj.dispatch[0].date,resObj.return[0].date);
    var total=0;
    var returnItem_id = 0;
    var return_id=0;
    var i=0,j=0;

    //itrate through all the dispatch main items
    for(i=resObj.dispatch.length-1;i>=0;i--)
    {     
        //itrate throush dispatched item list in each bill of dispatch   
        for(j=resObj.dispatch[i].dispatchedItems.length-1 ;j>=0;j--){            
            
            if(resObj.dispatch[i].dispatchedItems[j].item_detail_id==resObj.return[return_id].returnedItems[returnItem_id].item_detail_id){
                
                days=calculateDays(resObj.dispatch[i].date,resObj.return[return_id].date);
                rate=resObj.rent[return_id].rentedItems[returnItem_id].rate;
                
                console.log("\n\n---return Id : "+return_id+"\n---return Item id : "+returnItem_id+"\n---Dispatch Id : "+i+"\n---Dispatch Item Id : "+j);
                
                rqty = (resObj.return[return_id].returnedItems[returnItem_id].quantity)>resObj.dispatch[i].dispatchedItems[j].quantity?resObj.dispatch[i].dispatchedItems[j].quantity:resObj.return[return_id].returnedItems[returnItem_id].quantity;
                resObj.return[return_id].returnedItems[returnItem_id].quantity -= rqty;
                resObj.dispatch[i].dispatchedItems[j].quantity -= rqty;
                
                if(resObj.dispatch[i].dispatchedItems[j].quantity > 0)
                     j++;
                
                var rent=rate*days*rqty;
                console.log('rent: '+rent);
                console.log('days: '+days);
                
                total+=rent;
                
                if(resObj.return[return_id].returnedItems[returnItem_id].quantity <= 0)
                {
                    if(returnItem_id < resObj.return[return_id].returnedItems.length-1)
                    {
                        returnItem_id++;
                        j=resObj.dispatch[resObj.dispatch.length-1].dispatchedItems.length;
                        i=resObj.dispatch.length-1;
                    }
                    else if(returnItem_id<resObj.return[return_id].length-1 && return_id < (resObj.return.length-1))
                    {
                                return_id++; 
                                returnItem_id=0;                                          
                    }
                    else
                        {                            
                            i = -1;
                            j = -1;
                            console.log("Total bill : "+total);
                            return true;
                        }                    
                }
            }          
              
        }
    }
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

module.exports = router;