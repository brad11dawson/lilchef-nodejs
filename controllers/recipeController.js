const recipeModel = require("../models/recipeModel.js");

function getRecipeFromBooks(req, res) {
    console.log("getting the recipe from the books");
    var book_id = req.query.book_id;
    recipeModel.getByBook(book_id, function(error, result) {
        console.log("result: ", result);
        res.send(result);
      });
}

function addRecipe(req, res) {
    var recipe_name = req.body.recipe_name;
    var recipe_description = req.body.recipe_description;
    var ingrediants = req.body.ingrediants;
    var cooking_instructions = req.body.cooking_instructions;
    var book_id = req.body.book_id;

    console.log("about to add recipe");
    console.log("new recipe name: " + recipe_name);
    console.log("new recipe description: " + recipe_description);
    console.log("new ingrediants: " + ingrediants);
    console.log("new cooking instructions: " + cooking_instructions);
    console.log("book id being added to: " + book_id);

    recipeModel.addRecipe(recipe_name, recipe_description, ingrediants, cooking_instructions, book_id, function(error) {
      if (error) {
        console.log("error while adding recipe");
      }
      else {
        res.send();
      }
    });
}

module.exports = {
  getRecipeFromBooks: getRecipeFromBooks,
  addRecipe: addRecipe
};