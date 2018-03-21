var Sequelize = require('sequelize');
var connection;

module.exports={
    connect : function(){
        connection=new Sequelize('yashikaenterprise','root','',{
        host: 'localhost',
        dialect:'mysql',
        pool:{
            max: 20,
            min: 0,
            acquire: 30000,
            idle: 10000
            }
        });
        return connection;
    },
    testConnection: function(){
        connection.authenticate().then(()=>{
            console.log('Database Connected');
        })
        .catch((err)=>{
            console.log('error : ',err);
        })
    }    
};