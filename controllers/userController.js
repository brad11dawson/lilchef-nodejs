const userModel = require("../models/userModel.js");
const session = require('express-session');

function createUser(req, res) {
    console.log("creating a user in user controller");
    var username = req.body.userName;
    var password = req.body.password;
    var displayname = req.body.displayName;
    userModel.createUser(username, displayname, password, function(error) {
        if(error) {
            console.log("error while creating account");
        }
        else {
            res.render("./partials/login.ejs");
        }
    }) 
}

function loginUser(req, res) {
    console.log("logging in user in user controller");
    var username = req.body.username;
    var password = req.body.password;
    console.log("username: " + username);
    console.log("password: " + password);

    userModel.verifyUser(username, password, function(error, verified, userId) {
        if (error) {
            console.log("error with login procces");
        } 
        else {
            if(verified) {
                console.log("user password was correct");
                req.session.userId = userId;
                console.log("id = " + req.session.userId);
                res.send(true);
            }
            else {
                console.log("password was not correct");
                res.send(false);
            }
        }
    }) 
}

function logOut(req, res) {
    req.session.destroy();
    res.render("./partials/login.ejs");
}

module.exports = {
	createUser: createUser,
    loginUser: loginUser,
    logOut: logOut
};