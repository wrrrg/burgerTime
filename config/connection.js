var mysql = require("mysql");

var connection;

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    port: 3306,
    host: "localhost",
    user: "root",
    password: "",
    database: "burgers_db"
  });
};

// This is the actual connection part, the above is just the configuration for the mysql connect.

connection.connect(function(err) {
  if(err) {
    console.log("error! This happened: " + err.stack);
    return;
  }
  console.log("connected! Id is " + connection.threadId);
});

// export so we can use it with handlebars and stuff I think
module.exports = connection;
