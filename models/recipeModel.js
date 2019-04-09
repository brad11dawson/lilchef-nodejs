const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL || "postgres://lilchefuser:masterchef@localhost:5432/lilchefdb";
const pool = new Pool({connectionString: connectionString});

function getByBook(id, callback) {
    var sql = "SELECT id, recipe_name, recipe_description, ingrediants, directions FROM recipe WHERE cookbook_id = " + id + ";"
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

function addRecipe(recipe_name, recipe_description, ingrediants, cooking_instructions, book_id, callback) {
    var sql = "INSERT INTO recipe(recipe_name, recipe_description, ingrediants, directions, cookbook_id)\
    VALUES('" + recipe_name + "', '" + recipe_description + "', '" + ingrediants + "', '" + cooking_instructions + "',\
    '" + book_id + "')";

    console.log("sql being added is: " + sql);
    pool.query(sql, function(err, result) {
        if (err) {
          console.log("error accessing database");
          console.log("error");
          callback(true);
        }
        callback(null);
      })
}

module.exports = {
    getByBook: getByBook,
    addRecipe: addRecipe
};