const bookModel = require("../models/bookModel.js");

function getUsersBooks(req, res) {
    console.log("getting the books for current user");
    var userid = 1;
    bookModel.getByUser(userid, function(error, result) {
        console.log("result: ", result);
        res.send(result);
      });
}

module.exports = {
	getUserBooks: getUsersBooks
};