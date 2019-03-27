function getLogin(req, res) {
    console.log("getting login screen");
    
    res.render("./partials/login.ejs");
}

function getSignup(req, res) {
    console.log("getting signup screen");
    res.render("./partials/signup.ejs");
}

module.exports = {
	getLogin: getLogin,
	getSignup: getSignup,
};