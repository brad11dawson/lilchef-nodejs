//const bookModel = require("../models/bookModel.js");

function getRecipeFromBooks(req, res) {
    console.log("getting the recipe from the books");
    var userid = 1;
    bookModel.getByUser(userid, function(error, result) {
        console.log("result: ", result);
        res.send(result);
      });
}

module.exports = {
	getRecipeFromBooks: getRecipeFromBooks
};