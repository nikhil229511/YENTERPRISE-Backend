var express = require('express');
var router = express.Router();
var con= require('./../DBModels/connection');
var model= require('./../DBModels/Models');
var connect=con.connect();
var app=express();
var bodyParser =require('body-parser');
var urlEncode=require('urlencode');
var http = require("http");
    
//var name,add1,add2,PIN,state_code,state,GSTNo,contactno,email,is_customer;

/*router.get('/',function(req,res){
    var PIN='395023';
    var str='http://maps.googleapis.com/maps/api/geocode/json?address='+PIN+'\&sensor=true';
    var encodedStr=urlEncode.decode(str,'UTF-8');
    console.log(encodedStr);
    res.redirect(encodedStr);
});*/

router.get('/',function(req,res){
    var PIN='395023';
    var str='http://postalpincode.in/api/pincode/'+PIN;
    var url=urlEncode.decode(str,'UTF-8');
    console.log("----ayya");

    var request = http.get(url, function (response) {
    // data is streamed in chunks from the server
    // so we have to handle the "data" event    
    var buffer = "",data,state;

    response.on("data", function (chunk) {
        buffer += chunk;
    }); 

    response.on("end", function (err) {
        console.log(buffer);
        console.log("\n");
        data = JSON.parse(buffer);

        if(data.Status=='Success')
        {
        state = data.PostOffice[0];
        console.log('\n\n');
        console.log(state.District+","+state.State);
    }
        // extract the distance and time
        //console.log("Walking Distance: " + route.legs[0].distance.text);
        //console.log("Time: " + route.legs[0].duration.text);
    }); 
}); 
    

});

router.post('/',function(req,res){
    // var PIN='395023';
    // var str='http://maps.googleapis.com/maps/api/geocode/json?address='+PIN+'\&sensor=true';
    // var encodedStr=urlEncode.decode(str,'UTF-8');
    // console.log(encodedStr);
    // res.render(encodedStr);
    /*model.BusinessAssociates().create({
        name:req.body.name,
        add1:req.body.add1,
        add2:req.body.add2,
        PIN:req.body.PIN,    
        statecode:req.body.state_code,
        GSTNo:req.body.GSTNo,
        contactno:req.body.contactno,
        email:req.body.email,
        state:req.body.state,
        is_customer:req.body.is_customer,
    }).then(function(err){
        console.log('created Business Associates');
    });*/
    //res.end('success');
});

module.exports = router;