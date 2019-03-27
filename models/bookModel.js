const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL || "postgres://lilchefuser:masterchef@localhost:5432/lilchefdb";
const pool = new Pool({connectionString: connectionString});

function getByUser(id, callback) {
    var sql = "SELECT id, cookbook_name, cookbook_description FROM cookbook WHERE cookbook_admin = " + id + ";"
    console.log("sql query is: " + sql);
    pool.query(sql, function(err, result) {
      if (err) {
        console.log("error accessing database");
        console.log("error");
        callback(err, null);
      }
      console.log("Found results: " + JSON.stringify(result.rows));
      callback(null, result.rows);
    })
}

module.exports = {
	getByUser: getByUser,
};