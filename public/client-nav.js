function gotoLogin() {
    console.log("putting sign up screen on main");
    $.get("/getLogin", function(html) {
        console.log("back from getting login screen");
        $("#main").html(html);
        $("#signupLink").removeClass("active");
        $("#loginLink").addClass("active");
    })
}

function gotoSignup() {
    console.log("putting sign up screen on main");
    $.get("/getSignup", function(html) {
        $("#main").html(html);
        $("#signupLink").addClass("active");
        $("#loginLink").removeClass("active");
    })
}

function createUser() {
    console.log("creating a new user");
    var displayName = $("[name='displayname']").val();
    var userName = $("[name='username']").val();
    var password = $("[name='password']").val();
    var validForm = true;
    //check to make sure form is filled out
    if (displayName == "") {
        $('#displaynameError').html("please enter displayname")
        validForm = false;
    } else {
        $('#displaynameError').html("")
    }
    if (userName == "") {
        $('#usernameError').html("please enter username")
        validForm = false;
    } else {
        $('#usernameError').html("")
    }
    if (password == "") {
        $('#passwordError').html("please enter password")
        validForm = false;
    } else {
        $('#displaynameError').html("")
    }

    console.log("display name is: " + displayName);
    console.log("username is: " + userName);
    if (validForm) {
        $.post("/createNewUser", { displayName: displayName, userName: userName,
            password: password }, function(html) {
            console.log("Created a user");
            $("#main").html("<h2>Account Successfully Created!</h2>");
            $("#main").append(html);
        })
    }
}

function loginUser() {
    console.log("logging in user");
    var username = $("[name='username']").val();
    var password = $("[name='password']").val();
    var validForm = true;
    //check to make sure form is filled out
    if (username == "") {
        $('#usernameError').html("please enter a username")
        validForm = false;
    } 
    else {
        $('#usernameError').html("")
    }

    if (password == "") {
        $('#passwordError').html("please enter password")
        validForm = false;
    } 
    else {
        $('#passwordError').html("")
    }

    if (validForm) {
        $.post("/loginUser", { username: username, password: password}, function(validSignIn) {
            //console.log("Logged in a user");
            if (validSignIn) {
                $("#title").html(username + "'s Cookbook");
                console.log("password was correct");
                getCookbooks();
                setNavigation();
            }
            else {
                $('#signInError').html("Either the password was incorrect your the username does not exist. Please try again.");
                console.log("password was wrong");
            }
        })
    }
}

function isLoggedIn() {
    console.log("hello there world im going to check if we are using this function");
    $.get("/isLoggedIn", function(isLoggedIn) {
        if(isLoggedIn) {
            getCookbooks();
            setNavigation();
        }
    })
}
window.onload = isLoggedIn;

function getCookbooks() {
    console.log("getting user cookbooks");
    $.get("/getUserBooks", function(books) {
        console.log("got the users cookbooks");
        $("div#main").html("");
        $("div#main").append('<div class="container">\
        <button type="button" class="btn btn-secondary" data-toggle="collapse" data-target="#addBookForm">Start New Cookbook</button>\
        <div id="addBookForm" class="collapse my-4">\
        <form>\
          <div class="form-group">\
            <label>Cookbook Name:</label><br/>\
            <input type="text" name="book_name">\
          </div>\
        <br/>\
        <div class="form-group">\
          <label for="book_description">Enter Recipe Description</label>\
          <textarea class="form-control" id="book_description" name="book_description" rows="3" required></textarea>\
        </div>\
        <br/>\
        <p id="formError" class="text-warning"></p>\
          <button type="button" class="btn btn-primary mb-2" onclick="createBook()">Create New Cookbook!</button>\
        </form>\
        </div>\
      </div>')
          
          //print the recipe name and description for each item in the json list
          $.each(books, function(index) {
            $("div#main").append('<h3 class="text-center">' + this.cookbook_name + '</h3>');
            $("div#main").append('<p class="text-center">' + this.cookbook_description + '</p>');
            $("div#main").append('<button type="button" onclick="getRecipesFromBook(' + this.id + ')">Open Book!</button>');
            console.log("id of book: " + this.id);
        })
    })
}

function logOut() {
    $.get("/logOut", function(htmlLogin){
        $("div#main").html(htmlLogin);
    });
    $("#left").html('<h2>Explore</h2>\
    <ul class="nav nav-pills nav-justified flex-column">\
        <li class="nav-item">\
          <a class="nav-link active" onclick="gotoLogin()" id="loginLink">Log In</a>\
        </li>\
        <li class="nav-item">\
          <a class="nav-link" onclick="gotoSignup()" id="signupLink">Sign Up</a>\
        </li>\
    </ul>');
    $("#title").html("<h1>Little Chef's Cookbook</h1>");
}

function getRecipesFromBook(book_id) {
    console.log("getting recipes " + book_id);
    $.get("/getRecipesFromBook", { book_id : book_id }, function(recipes) {
        console.log("gotRecipies");
        $("div#main").html("");
        $("div#main").append('<div class="container">\
        <button type="button" class="btn btn-secondary" data-toggle="collapse" data-target="#addRecipeForm">Add Recipe</button>\
        <div id="addRecipeForm" class="collapse my-4">\
        <form">\
          <div class="form-group">\
            <label>Recipe Name:</label><br/>\
            <input type="text" name="recipe_name">\
          </div>\
        <br/>\
        <div class="form-group">\
          <label for="recipe_description">Enter Recipe Description</label>\
          <textarea class="form-control" id="recipe_description" name="recipe_description" rows="3" required></textarea>\
        </div>\
        <div class="form-group">\
          <label for="ingrediants">Enter Ingrediants</label>\
          <textarea class="form-control" id="ingrediants" name="ingrediants" rows="3" required></textarea>\
        </div>\
        <div class="form-group">\
          <label for="directions">Enter cooking instructions</label>\
          <textarea class="form-control" id="directions" name="directions" rows="3" required></textarea>\
        </div>\
        <br/>\
        <p id="formError" class="text-warning"></p>\
          <button type="button" class="btn btn-primary mb-2" onclick="addRecipe(' + book_id + ')">Add to Cookbook</button>\
        </form>\
        </div>\
      </div>')
        $.each(recipes, function(index) {
            $("div#main").append('<h2 class="text-center">' + this.recipe_name + '</h2>');
            $("div#main").append('<p class="textcenter">' + this.recipe_description + '</p>');
            $("div#main").append('<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapse' + this.id + '" aria-expanded="false" aria-controls="collapseExample">\
            Open Delicious Recipe\
            </button></br>')
            $("div#main").append('<div class="collapse text-left" id="collapse' + this.id + '">\
            <div class="card card-body">\
                <h3>Ingrediants</h3>\
              ' + this.ingrediants + '\
              <h3>Cooking Instructions</h3>\
              ' + this.directions + '\
            </div>\
            </div>')
        })
        $("div#main").append('</br><button type="button" onclick="getCookbooks()">Go back to books</button>');
    })  
}

function createBook() {
    var book_name = $("[name='book_name']").val();
    var book_description = $("[name='book_description']").val();
    var validForm = true;

    if (book_name == "") {
        validForm = false;
    }
    if (book_description == "") {
        validForm = false
    }
    if(validForm) {
        $("p#formError").html("");
        console.log("form was valid. creating new book");
        console.log("new book name is " + book_name);
        console.log("new book description is " + book_description);
        $.post("/createNewBook", { book_name : book_name, book_description: book_description }, function() {
            getCookbooks();
        })
    }
    else {
        $("p#formError").html("Please fill in both Cookbook name and description to make new book");
    }
}

function addRecipe(book_id) {
    var recipe_name = $("[name='recipe_name']").val();
    var recipe_description = $("[name='recipe_description']").val();
    var ingrediants = $("[name='ingrediants']").val();
    var cooking_instructions = $("[name='directions']").val();
    var validForm = true;

    if (recipe_name == "") {
        validForm = false;
    }
    if (recipe_description == "") {
        validForm = false
    }
    if (ingrediants == "") {
        validForm = false;
    }
    if (cooking_instructions == "") {
        validForm = false
    }

    if(validForm) {
        console.log("about to add a new recipe for bookid: " + book_id);
        $("p#formError").html("");
        console.log("form was valid. creating new recipe");
        console.log("new recipe name is " + recipe_name);
        console.log("new recipe description is " + recipe_description);
        console.log("ingrediants are: " + ingrediants);
        console.log("directions are:  " + cooking_instructions);
        $.post("/addNewRecipe", { recipe_name : recipe_name, recipe_description: recipe_description, 
        ingrediants: ingrediants, cooking_instructions: cooking_instructions, book_id : book_id }, function() {
            console.log("recipe was added")
            getRecipesFromBook(book_id);
        })
    }
    else {
        $("p#formError").html("Please fill in the page to add a new yummy recipe");
    }
}

function setNavigation() {
    $("#left").html('<h2>Explore</h2>\
    <ul class="nav nav-pills nav-justified flex-column">\
        <li class="nav-item">\
        <a class="nav-link active" onclick="getCookbooks()" id="gotoBookLink">View Books</a>\
        </li>\
        <li class="nav-item">\
        <a class="nav-link" onclick="logOut()" id="logoutLink">Log Out</a>\
        </li>\
    </ul>') 
}