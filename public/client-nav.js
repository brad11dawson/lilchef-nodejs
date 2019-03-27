function gotoLogin() {
    console.log("putting sign up screen on main");
    $.get("/getLogin", function(html) {
        console.log("back from getting login screen");
        $("#main").html(html);
    })
}

function gotoSignup() {
    console.log("putting sign up screen on main");
    $.get("/getSignup", function(html) {
        $("#main").html(html);
    })
}

function createUser() {
    console.log("creating a new user");
    var displayName = $("[name='displayname']").val();
    var userName = $("[name='username']").val();
    var password = $("[name='password']").val();

    console.log("display name is: " + displayName);
    console.log("username is: " + userName);

    $.post("/createNewUser", { displayName: displayName, userName: userName,
        password: password }, function(html) {
        console.log("Created a user");
        $("#main").html("<h2>Account Successfully Created!</h2>");
        $("#main").append(html);
    })
}

function loginUser() {
    console.log("logging in user");
    var userName = $("[name='username']").val();
    var password = $("[name='password']").val();

    $.get("/loginUser", function(html) {
        console.log("Logged in a user");
    })
}

function getCookbooks() {
    console.log("getting user cookbooks");
    var userid = 1;
    $.get("/getUserBooks", function(books) {
        console.log("got the users cookbooks");
        $("div#main").html("");
          
          //print the recipe name and description for each item in the json list
          $.each(books, function(index) {
            $("div#main").append('<li class="text-left">' + this.cookbook_name + '</li>');
            $("div#main").append('<p class="text-left">' + this.cookbook_description + '</p>');
            $("div#main").append('<button type="button" onclick="getRecipesFromBook(' + this.id + ')">Open Book!</button>');
        })
    })
}

function getRecipesFromBook(id) {
    console.log("getting recipes " + id);
    $.get("/getRecipesFromBook", function(recipes) {
        console.log("gotRecipies");
    })
}