var Sequelize = require('sequelize');
var connection;
var pg=require('pg');
module.exports={
    connect : function(){


    var conString = "postgres://zsxoexqbgvzuij:1198bc5ba815f3d369239897c4ca91b53bd58ce31fad8bf92328c4309cb72c55@ec2-54-243-210-70.compute-1.amazonaws.com:5432/d85ib48u7j6fh7";
    connection = new pg.Client(conString);
    // connection.connect();
    // var client = new pg.Client({
    //     user: "zsxoexqbgvzuij",
    //     password: "1198bc5ba815f3d369239897c4ca91b53bd58ce31fad8bf92328c4309cb72c55",
    //     database: "d85ib48u7j6fh7",
    //     port: 5432,
    //     host: "ec2-54-243-210-70.compute-1.amazonaws.com",
    //     ssl: true
    // }); 
    // client.connect();
        
        return connection;
    },
    testConnection: function(){
        // connection.authenticate().then(()=>{
        //     console.log('Actually connected');
        // })
        // .catch((err)=>{
        //     console.log('error : ',err);
        // })
    }    
};