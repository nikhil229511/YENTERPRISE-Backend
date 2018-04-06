var mysql=require('mysql');
var connection;

module.exports={
    connect : function(){
        connection = mysql.createConnection({
            host: "db4free.net",
            port:"3307",
            user: "yenterprise",
            password: "a39c70",
            database: "yenterprise"
          });
          return connection;
    },
    testConnection: function(){
        connection.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
        })
    }    
};