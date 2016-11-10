var mysql = require("mysql");

// First you need to create a connection to the db
var con = mysql.createConnection({
  host: "mysql4.gear.host",
  user: "icom5016",
  password: "Yp5Sen~8XA_9",
  database: "icom5016"
});

con.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});
//QUERIES
var query = [];
query.push('SELECT * FROM user');
query.push('SELECT * FROM student');
query.push('SELECT * FROM isStudent');
query.push('SELECT * FROM countdown');
query.push('SELECT * FROM hasCountdown');
query.push('SELECT * FROM tutor');
query.push('SELECT * FROM isTutor');
query.push('SELECT * FROM card');
query.push('SELECT * FROM groups');
query.push('SELECT * FROM message');
query.push('SELECT * FROM courses');
// query.push('SELECT * FROM allCourses');
for(var i =0; i<query.length;i++){
    con.query(query[i],function(err,rows){
    if(err) throw err;
    console.log('Data received from Db:\n');
    console.log(rows);
  });
}
//End QUERIES

con.end(function(err) {
  // The connection is terminated gracefully
  // Ensures all previously enqueued queries are still
  // before sending a COM_QUIT packet to the MySQL server.
});
