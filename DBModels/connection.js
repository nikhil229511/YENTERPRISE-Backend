//var Sequelize = require('sequelize');
var mysql=require('mysql');
var connection;
var pg=require('pg');
module.exports={
    connect : function(){
<<<<<<< HEAD
    // connection = new pg.Client('postgres://zsxoexqbgvzuij:1198bc5ba815f3d369239897c4ca91b53bd58ce31fad8bf92328c4309cb72c55@ec2-54-243-210-70.compute-1.amazonaws.com:5432/d85ib48u7j6fh7');
    //connection.connect();
     connection = new pg.Client({
        user: "zsxoexqbgvzuij",
        password: "1198bc5ba815f3d369239897c4ca91b53bd58ce31fad8bf92328c4309cb72c55",
        database: "d85ib48u7j6fh7",
        port: 5432,
        host: "ec2-54-243-210-70.compute-1.amazonaws.com",
        ssl: true,
        dialect: 'postgres'
    }); 
    connection.connect();



   
    return connection;
    },
    testConnection: function(){
        const query=connection.query('drop table if exists public.test11');
        query.testConnection;
        
        // .complete(()=>{
        //     console.log('Actually connected');
=======
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
>>>>>>> 71801984f3df23b442d35b4e368042fff60c0df9
        // })
        // .catch((err)=>{
        //     console.log('error : ',err);
        // })
<<<<<<< HEAD
=======
        connection.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
        })
>>>>>>> 71801984f3df23b442d35b4e368042fff60c0df9
    }    
};