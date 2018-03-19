var Sequelize = require('sequelize');
var connection;
var pg=require('pg');
module.exports={
    connect : function(){
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
        // })
        // .catch((err)=>{
        //     console.log('error : ',err);
        // })
    }    
};