const express = require('express')
const path = require('path')
const session = require('express-session')

const PORT = process.env.PORT || 5000

const mainController = require("./controllers/mainController.js");
const userController = require("./controllers/userController");
const bookController = require("./controllers/bookController");
const recipeController = require("./controllers/recipeController");
const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL || "postgres://lilchefuser:masterchef@localhost:5432/lilchefdb";
const pool = new Pool({connectionString: connectionString});

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.json())
  .use(express.urlencoded({extended: true}))
  
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .use(session({
    secret: 'i am chef',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
  }))
  
  /*.use(
    function(req, res, next) {
      console.log("the user id is:" + req.session.userId);
      next();
    }
  )*/
  .get('/isLoggedIn', function(req, res) {
    console.log("checking if we are logged in");
      if (req.session.userId) {
        console.log("we were logged in")
        res.send(true);
      }
      else {
        console.log("we are NOT logged int");
        res.send(false);
      }
  })
  .get('/', (req, res) => res.render('pages/index'))
  .get('/getData', getData)
  .get('/getLogin', mainController.getLogin)
  .get('/getSignup', mainController.getSignup)
  .get('/loginUser', userController.loginUser)
  .get('/getUserBooks', bookController.getUserBooks)
  .get('/getRecipesFromBook', recipeController.getRecipeFromBooks)
  .post('/createNewUser', userController.createUser)
  .post('/loginUser', userController.loginUser)
  .get('/logOut', userController.logOut)
  .post('/createNewBook', bookController.createBook)
  .post('/addNewRecipe', recipeController.addRecipe)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

  function getData(req, res) {
    console.log("getting data!");
    getRecipeFromDb(function(error, result) {
      console.log("result: ", result);
      res.send(result);
    });
  }

  function getRecipeFromDb(callback) {
    console.log("going to get the recipies");

    var sql = "SELECT recipe_name, recipe_description FROM recipe;"
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

  