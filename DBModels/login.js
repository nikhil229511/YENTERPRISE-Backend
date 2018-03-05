var Sequelize = require('sequelize');
var con=require('./connection');
var model=require('./Models');

model.loginMaster().findAll().then(function(res){
    console.log(res[0].dataValues);
});