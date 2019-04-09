const bcrypt = require('bcrypt');
const { Pool } = require("pg");
const saltRounds = 10;

const connectionString = process.env.DATABASE_URL || "postgres://lilchefuser:masterchef@localhost:5432/lilchefdb";
const pool = new Pool({connectionString: connectionString});

function createUser(username, displayname, password, callback) {
    console.log("user: " + username);
    console.log("display: " + displayname);

    bcrypt.hash(password, saltRounds,function(err, hash) {
        var sql = "INSERT INTO general_user(username, displayname, password) VALUES('" + username + "', '" + displayname + "', '" + hash + "')";
        console.log("sql: " + sql);
        pool.query(sql, function(err, result) {
            if (err) {
                callback(true);
            }
            else {
                callback(null);
            }
        })
    })
}

function verifyUser(username, password, callback) {
    console.log("username: " + username);
    console.log("password: " + password);
    console.log("about to verify uesr");

    var sql = "SELECT password, id FROM general_user WHERE username=$1::text limit 1";
    var params = [username];
    console.log("sql: " + sql);
    pool.query(sql, params, function(err, result) {
        //error proccesing request
        if (err) {
            console.log("sql query did not work")
            callback(true, false, null);
        }
        else {
            //check if data was returned
            if(result.rows.length > 0) { 
                //the hash from the database
                var hash = result.rows[0].password;

                console.log("hash being checked: " + hash);
                
                bcrypt.compare(password, hash, function(err, res) {
                    //password matched, okay to login
                    if (res == true) {
                        var userId = result.rows[0].id;
                        callback(false, true, userId);
                    } 
                    //password was not a match, dont login
                    else {
                        callback(false, false, null);
                    }
                });
            }
            else {
                console.log("user does not exist");
                callback(false, false, null);
            }
        }
    })
} 

module.exports = {
    createUser: createUser,
    verifyUser: verifyUser
};