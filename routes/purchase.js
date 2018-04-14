var express = require('express');
var router = express.Router();
var con= require('./../DBModels/connection');
var model= require('./../DBModels/Models');
var connect=con.connect();
var app=express();
var bodyParser =require('body-parser');
var async=require('async');

var id,sql,invoice_no,date,ba_id,company_id,amount,taxes,overhead_charges,is_credit;

router.get('/',function(req,res){
    var sql="Select pd.purchase_detail_id,pm.purchase_master_id,id.item_detail_id,id.item_detail_name,im.item_master_id,im.item_master_name,im.hsn_code,quantity,rate,invoice_no,date,pm.ba_id,ba.name as ba_name,pm.company_id,cm.name as company_name,pm.amount,pm.taxes,pm.loading_charges,pm.unloading_charges,pm.transport_charges,pm.is_credit FROM purchase_details pd inner join purchase_masters pm on pd.purchase_master_id = pm.purchase_master_id inner join business_associates ba on pm.ba_id = ba.ba_id inner join item_details id on pd.item_detail_id = id.item_detail_id inner join item_masters im on id.item_master_id = im.item_master_id inner join company_masters cm on pm.company_id = cm.company_id";
    connect.query(sql, function (err, result, fields) {
        if (err || result.length == 0){        
            res.writeHead(401);
            res.end();
        }else{
            res.end(JSON.stringify(result));
        }
    });
});



/*router.get('/ba',function(req,res){
    var sql="SELECT ba_id,name FROM business_associates WHERE is_customer=0";
    connect.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.end(JSON.stringify(result));
    });
});

router.get('/company',function(req,res){
    var sql="SELECT company_id,name FROM company_masters";
    connect.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.end(JSON.stringify(result));
    });
});*/

router.post('/',function(req,res){
    
    invoice_no=req.body.invoice_no;
    date=req.body.date;
    ba_id=req.body.ba_id;
    company_id=req.body.company_id;
    amount=req.body.amount;
    taxes=req.body.taxes;
    loading_charges=req.body.loading_charges;
    unloading_charges=req.body.unloading_charges;
    transport_charges=req.body.transport_charges;
    is_credit=req.body.is_credit;
    async.series([
        function(callback){
            sql="START TRANSACTION";
            connect.query(sql, function (err, result) {
                if (err){   
                    console.log('1')     
                    res.writeHead(401);
                    res.end("1");
                }else
                    callback(null,'succes1');    
            });
        },
        function(callback){
            sql="INSERT INTO purchase_masters(invoice_no,date,ba_id,company_id,amount,taxes,loading_charges,unloading_charges,transport_charges,is_credit) values ('"+invoice_no+"','"+date+"',"+ba_id+","+company_id+","+amount+","+taxes+","+loading_charges+","+unloading_charges+","+transport_charges+","+is_credit+");";
            connect.query(sql, function (err, result) {
                if (err){  
                    console.log('2')      
                    res.writeHead(401);
                    res.end("2");
                }else{
                    id=result.insertId;
                    callback(null,'succes2');    
                }
            });
        },
        function(callback){
            
            req.body.items.forEach(item => {
                sqlSub="INSERT INTO purchase_details(purchase_master_id,item_detail_id,rate,quantity) values ("+id+","+item.item_detail_id+","+item.rate+","+item.quantity+");";
                connect.query(sqlSub, function (err, result) {
                    if (err){     
                        console.log('3')   
                        res.writeHead(401);
                        res.end("3");
                    }
                });
            });
            callback(null,'success3');
        },
        function(callback){
            sqlSub="COMMIT";
            connect.query(sqlSub, function (err, result) {
                if (err){        
                    console.log('4')
                    res.writeHead(401);
                    res.end("4");
                }else
                    callback(null,'success4');
            });
        }
    ],
    function(){
        res.end('success');
    });
});


router.put('/:purchase_master_id',function(req,res){
    purchase_master_id=req.params.purchase_master_id;
    invoice_no=req.body.invoice_no;
    date=req.body.date;
    ba_id=req.body.ba_id;
    company_id=req.body.company_id;
    amount=req.body.amount;
    taxes=req.body.taxes;
    loading_charges=req.body.loading_charges;
    unloading_charges=req.body.unloading_charges;
    transport_charges=req.body.transport_charges;
    is_credit=req.body.is_credit;
    
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
            sql="UPDATE purchase_masters SET invoice_no='"+invoice_no+"',date='"+date+"',ba_id="+ba_id+",company_id="+company_id+",amount="+amount+", taxes="+taxes+",loading_charges="+loading_charges+",unloading_charges="+unloading_charges+",transport_charges="+transport_charges+",is_credit="+is_credit+" WHERE purchase_master_id="+purchase_master_id+"";
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
            
            req.body.items.forEach(item => {
                sqlSub="UPDATE purchase_details SET purchase_master_id="+purchase_master_id+",item_detail_id="+item.item_detail_id+",rate="+item.rate+",quantity="+item.quantity+" WHERE purchase_master_id="+purchase_master_id+" AND item_detail_id="+item.item_detail_id+";";
                console.log(sqlSub); 
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



router.delete('/:purchase_master_id',function(req,res){
    purchase_master_id=req.body.purchase_master_id;
    
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
            sqlSub="DELETE FROM purchase_details WHERE purchase_master_id="+purchase_master_id+";";
            console.log("\n"+sqlSub); 
            connect.query(sqlSub, function (err, result) {
                if (err){        
                    res.writeHead(401);
                    res.end();
                }else
                callback(null,'success3');
            });            
        },

        function(callback){
            sql="DELETE FROM purchase_masters WHERE purchase_master_id="+purchase_master_id+";";
            console.log(sql);
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