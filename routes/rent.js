var express = require('express');
var router = express.Router();
var con= require('./../DBModels/connection');
var model= require('./../DBModels/Models');
var connect=con.connect();
var app=express();
var bodyParser =require('body-parser');
var async=require('async');

var id,sql,invoice_no,date,ba_id,company_id,amount,taxes,overhead_charges,is_credit,status;

router.get('/',function(req,res){
    var sql="Select rd.rent_detail_id,rm.rent_master_id, id.item_detail_id, id.item_detail_name, quantity,rate,invoice_no,date, rm.site_id,sm.site_name, rm.company_id,cm.name as company_name, rm.amount, rm.taxes, rm.loading_charges, rm.unloading_charges,rm.transport_charges, rm.is_credit,rm.status FROM rent_details rd inner join rent_masters rm on rd.rent_master_id = rm.rent_master_id inner join site_masters sm on rm.site_id = sm.site_id inner join item_details id on rd.item_detail_id = id.item_detail_id inner join company_masters cm on cm.company_id = rm.company_id";
    connect.query(sql, function (err, result, fields) {
        console.log('1');
        if (err || result.length == 0){        
            res.writeHead(401);
            res.end();
        }else{
            res.end(JSON.stringify(result));
        }
    });
});

router.post('/',function(req,res){
    
    invoice_no=req.body.invoice_no;
    date=req.body.date;
    site_id=req.body.site_id;
    company_id=req.body.company_id;
    amount=req.body.amount;
    taxes=req.body.taxes;
    loading_charges=req.body.loading_charges;
    unloading_charges=req.body.unloading_charges;
    transport_charges=req.body.transport_charges;
    is_credit=req.body.is_credit;
    status=req.body.status;
    
    async.series([
        function(callback){
            sql="START TRANSACTION";
            connect.query(sql, function (err, result) {
                if (err){        
                    res.writeHead(401);
                    res.end();
                }else
                    callback(null,'succes1');    
            });
        },
        function(callback){
            sql="INSERT INTO rent_masters(invoice_no,date,site_id,company_id,amount,taxes,loading_charges,unloading_charges,transport_charges,is_credit,status) values ('"+invoice_no+"','"+date+"',"+site_id+","+company_id+","+amount+","+taxes+","+loading_charges+","+unloading_charges+","+transport_charges+","+is_credit+",'"+status+"');";
            connect.query(sql, function (err, result) {
                if (err){        
                    console.log(err);
                    res.writeHead(401);
                    res.end();
                }else{
                    id=result.insertId;
                    callback(null,'succes2');    
                }
            });
        },
        function(callback){
            
            req.body.items.forEach(item => {
                sqlSub="INSERT INTO rent_details(rent_master_id,item_detail_id,rate,quantity) values ("+id+","+item.item_detail_id+","+item.rate+","+item.quantity+");";
                connect.query(sqlSub, function (err, result) {
                    if (err){        
                        res.writeHead(401);
                        res.end();
                    }
                    else{
                        s1="update item_details set total_items = total_items-"+item.quantity+" WHERE item_detail_id="+item.item_detail_id;
                        connect.query(s1,function(err,result){
                            if(err){
                                res.writeHead(401);
                                res.end();
                            }
                        });
                    }
                });
            });
            callback(null,'success3');
        },
        function(callback){
            sqlSub="COMMIT";
            connect.query(sqlSub, function (err, result) {
                if (err){        
                    res.writeHead(401);
                    res.end();
                }else
                    callback(null,'success4');
            });
        }
    ],
    function(){
        res.end('success');
    });
});


router.put('/:rent_master_id',function(req,res){
    rent_master_id=req.params.rent_master_id;
    invoice_no=req.body.invoice_no;
    date=req.body.date;
    site_id=req.body.site_id;
    company_id=req.body.company_id;
    amount=req.body.amount;
    taxes=req.body.taxes;
    loading_charges=req.body.loading_charges;
    unloading_charges=req.body.unloading_charges;
    transport_charges=req.body.transport_charges;
    is_credit=req.body.is_credit;
    status=req.body.status;
    
    async.series([
        function(callback){
            sql="START TRANSACTION";
            console.log(sql);
            connect.query(sql, function (err, result) {
                if (err){        
                    res.writeHead(401);
                    res.end();
                }else
                    callback(null,'succes1');
            });
        },
        function(callback){
            sql="UPDATE rent_masters SET invoice_no='"+invoice_no+"',date='"+date+"',site_id="+site_id+",company_id="+company_id+",amount="+amount+", taxes="+taxes+",loading_charges="+loading_charges+",unloading_charges="+unloading_charges+",transport_charges="+transport_charges+",is_credit="+is_credit+",status='"+status+"' WHERE rent_master_id="+rent_master_id+"";
            connect.query(sql, function (err, result) {
                if (err){        
                    res.writeHead(401);
                    res.end();
                }else
                    callback(null,'succes1');
            });
        },
        function(callback){
            
            req.body.items.forEach(item => {
                sqlSub="UPDATE rent_details SET rent_master_id="+rent_master_id+",item_detail_id="+item.item_detail_id+",rate="+item.rate+",quantity="+item.quantity+" WHERE rent_master_id="+rent_master_id+" AND item_detail_id="+item.item_detail_id+";";
                connect.query(sqlSub, function (err, result) {
                    if (err){        
                        res.writeHead(401);
                        res.end();
                    }                    
                });                
            });
            callback(null,'success3');
        },
        function(callback){
            sqlSub="COMMIT";
            console.log(sqlSub);
            connect.query(sqlSub, function (err, result) {
                if (err){        
                    res.writeHead(401);
                    res.end();
                }else
                    callback(null,'succes1');
            });
        }
    ],
    function(){
        res.end('success');
    });
});



router.delete('/:rent_master_id',function(req,res){
    rent_master_id=req.params.rent_master_id;
    
    async.series([
        function(callback){
            sql="START TRANSACTION";
            console.log(sql);
            connect.query(sql, function (err, result) {
                if (err){        
                    res.writeHead(401);
                    res.end();
                }else{
                    callback(null,'succes1');        
                }                
            });
        },
        function(callback){    
            sqlSub="DELETE FROM rent_details WHERE rent_master_id="+rent_master_id+";";
            connect.query(sqlSub, function (err, result) {
                if (err){        
                    res.writeHead(401);
                    res.end();
                }else
                callback(null,'success3');
            });            
        },

        function(callback){
            sql="DELETE FROM rent_masters WHERE rent_master_id="+rent_master_id+";";
            connect.query(sql, function (err, result) {
                if (err){        
                    res.writeHead(401);
                    res.end();
                }else
                callback(null,'success4');
            });
        },
        function(callback){
            sqlSub="COMMIT";
            console.log(sqlSub);
            connect.query(sqlSub, function (err, result) {
                if (err){        
                    res.writeHead(401);
                    res.end();
                }else
                callback(null,'success3');
            });
        }
    ],
    function(){
        res.end('success');
    });
});
module.exports = router;