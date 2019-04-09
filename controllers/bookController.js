const bookModel = require("../models/bookModel.js");
const session = require('express-session');

function getUsersBooks(req, res) {
    console.log("getting the books for current user");
    userid = req.session.userId;
    console.log("getting books for user: " + userid);
    bookModel.getByUser(userid, function(error, result) {
        console.log("result: ", result);
        res.send(result);
      });
}

function createBook(req, res) {
  console.log("creating a new book");
  book_name = req.body.book_name;
  book_description = req.body.book_description;
  book_admin = req.session.userId;

  console.log("book name: " + book_name);
  console.log("book description: " + book_description);
  console.log("user id of book: " + book_admin);

  bookModel.createBook(book_name, book_description, book_admin, function(error) {
    if (error) {
      console.log("error creating new book");
    }
    else {
      res.send();
    }
  })
}

module.exports = {
  getUserBooks: getUsersBooks,
  createBook: createBook
};