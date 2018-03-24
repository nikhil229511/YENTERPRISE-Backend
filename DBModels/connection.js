//var Sequelize = require('sequelize');
var mysql=require('mysql');
var connection;

module.exports={
    connect : function(){
        // connection=new Sequelize('yashikaenterprise','root','',{
        // host: 'localhost',
        // dialect:'mysql',
        // pool:{
        //     max: 20,
        //     min: 0,
        //     acquire: 30000,
        //     idle: 10000
        //     }
        // });
        // return connection;
        connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "yashikaenterprise"
          });
          return connection;
    },
    testConnection: function(){
        // connection.authenticate().then(()=>{
        //     console.log('Database Connected');
        // })
        // .catch((err)=>{
        //     console.log('error : ',err);
        // })
        connection.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
        })
    }    
};