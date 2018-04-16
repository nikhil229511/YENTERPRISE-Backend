var express = require('express');
var router = express.Router();
var con = require('./../DBModels/connection');
var model = require('./../DBModels/Models');
var connect = con.connect();
var app = express();
var bodyParser = require('body-parser');
var sql, site_name, add1, add2, PIN, state_code, state,city,ba_id;

router.get('/', function (req, res) {
    var sql = "SELECT * FROM site_masters";
    res.contentType('application/json')
    connect.query(sql, function (err, result, fields) {
        if (err || result.length == 0) {
            res.writeHead(401);
            res.end();
        } else
            res.end(JSON.stringify(result));
    });
});

router.post('/', function (req, res) {
    site_name = req.body.site_name;
    add1 = req.body.add1;
    add2 = req.body.add2;
    PIN = req.body.PIN;
    statecode = req.body.statecode;
    city = req.body.city;
    state = req.body.state;
    ba_id=req.body.ba_id;

    sql = "INSERT INTO site_masters(site_name,ba_id,add1,add2,city,state,statecode,PIN) values ('" + site_name + "'," + ba_id + ",'" + add1 + "','" + add2 + "','" + city + "','" + state + "','" + statecode + "','" + PIN + "')";
    console.log(sql);
    connect.query(sql, function (err, result) {
        if (err || result.length == 0) {
            res.writeHead(401);
            res.end();
        } else {
            res.writeHead(200);
            res.end();
        }
    });
});

router.put('/:site_id', function (req, res) {
    site_id = req.params.site_id;
    name = req.body.name;
    add1 = req.body.add1;
    add2 = req.body.add2;
    PIN = req.body.PIN;
    statecode = req.body.statecode;
    state = req.body.state;
    city=req.body.city;

    sql = "UPDATE site_masters set site_name='" + site_name + "',add1='" + add1 + "',add2='" + add2 + "',PIN='" + PIN + "',state='" + state + "',statecode='" + statecode + "',city='" + city + "',ba_id=" + ba_id + " WHERE site_id=" + site_id + "";
    console.log(sql);
    connect.query(sql, function (err, result) {
        if (err || result.length == 0) {
            res.writeHead(401);
            res.end();
        } else {
            res.writeHead(200);
            res.end();
        }
    });
});

router.delete('/:site_id', function (req, res) {
    site_id = req.params.site_id;
    sql = "DELETE FROM site_masters WHERE site_id=" + site_id + "";
    console.log(sql);
    connect.query(sql, function (err, result) {
        if (err || result.length == 0) {
            res.writeHead(401);
            res.end();
        } else {
            res.writeHead(200);
            res.end();
        }
    });
});

module.exports = router;