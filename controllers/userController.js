function createUser(req, res) {
    console.log("creating a user in user controller");
    var displayName;
    var userName;
    var password;

    res.render("./partials/login.ejs");
}

function loginUser(req, res) {
    console.log("logging in user in user controller");
    var userName;
    var password;
    
    res.send();
}

module.exports = {
	createUser: createUser,
	loginUser: loginUser,
};