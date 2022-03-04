// Fifth attempt at creating a Twitter clone for the Backend 1 exercise
// I tried doing it with .ejs files but had problem injecting code to HTML elements; it's much easier with PUG.
// I tried using the strategies and code we use in the lektioner but haven't understood much.
// I'll be using internet tutorials to try and complete this uppgift.

const express = require("express");
// Declares Express dependency and tells Node that we're using Express with this file.
const app = express();
// Initializes Express by making app variable an instance of the Express object
const PORT = 7000;
// Creates the port that the server of this app will run on.
const path = require("path"); 
// Uses the built-in path library, which I'll use to serve static files like images, css files etc.
const bodyParser = require("body-parser");
// Uses body-parser package
// When we submit a form, the data that's sent to the server is sent in the request body. So we need to get it from the body.
const middleware = require('./middleware');
// Creates the middelware object to use the function requireLogin which is in the middleware.js

// const mongoose = require("mongoose");
// Allows us to use the mongoose package.
const mongoose = require("./database");
// Allows us to use the mongoose package.
// Returns the same instance of the Database object in database.js, connecting us to the local MongoDB db.

const session = require("express-session");
// Allows us to use the express-session package.

// mongoose.connect("mongodb://localhost/twitter-clone-users")
// //Connects the TwitterCloneDB MongoDB database - (Don't forget to start Docker!)
// .then(() => {
//     console.log("Database connection successful")
// })
// //If connection is successful, it runs the code in then()
// .catch((err) => {
//     console.log("Database connection error" + err)
// })
// //If connection is unsuccessful, it runs the code in catch()

const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})
// Creates out server instance. We tell it which port to listen to and then what code to run once it starts listening.

app.set("view engine", "pug");
// Tells our server which template engine we're going to use to display web pages.
app.set("views", "views");
// Tells the server that when it needs a view page (a template), go to the folder called "views" to look for the file.

app.use(express.static(path.join(__dirname, "public")));
// I needed this code to load the login.css file in the login-layout.page;
// Specifies that any files inside the folder 'public' will be served as static files.
// (static files can be accessed directly by typing the path in the browser - like image files, for example.)
app.use(bodyParser.urlencoded({ extended: false }));
// Tells the app to use body-parser; "extended: false" is a setting and it means that the body 
// will be able to contain only key value pairs made up of strings or arrays (not all types of data).
// (Make sure to place the "app uses body-parser" code before you write the code that uses the routes (app.use("/register"...) )

app.use(session({
    secret: "hello panos", // Hashes the session, by hashing the string we declare here.
    resave: true, // Forces the session to be saved even if it wasn't modified.
    saveUninitialized: false // Prevents from saving the session uninitialized.
}));
// Set the app to use sessions by creating an instance of the package and pass in options

// ROUTES
const loginRoute = require("./routes/loginRoutes");
// Declares the loginRoute
const registerRoute = require("./routes/registerRoutes");
// Declares the registerRoute
const rootRoute = require("./routes/rootRoutes")
// Declares the rootRoute
const logoutRoute = require("./routes/logoutRoutes");
// Declares the logoutRoute
const profileRoute = require("./routes/profileRoutes");
// Declares the profileRoute

// API ROUTES
const postsApiRoute = require("./routes/api/posts.js");
// Declares the postsApiRoute
const usersApiRoute = require("./routes/api/users.js");
// Declares the postsApiRoute
// I wrote this code to try to send the MongoDB "users" data to the profile page, but not sure how to do it.

app.use("/login", loginRoute);
// Tells app.js to use the const "loginRoute" that points to the loginRoutes.js file's code, to handle any request to "/login" route.
app.use("/register", registerRoute);
// Tells app.js to use the const "registerRoute" that points to the registerRoutes.js file's code, to handle any request to "/register" route.
app.use("/", rootRoute);
// Tells app.js to use the const "rootRoute" that points to the rootRoutes.js file's code, to handle any request to "/root" route.
app.use("/logout", logoutRoute);
// Tells app.js to use the const "logoutRoute" that points to the logoutRoutes.js file's code, to handle any request to "/logout" route.
app.use("/profile", middleware.requireLogin, profileRoute);
// Tells app.js to use the const "profileRoute" that points to the profileRoutes.js file's code, to handle any request to "/profile" route.




// app.use for API
app.use("/api/posts", postsApiRoute);
// Tells app.js to use the const "postsApiRoute" that points to the routes/api/posts.js file's code, to handle any request to "/api/posts/" route.
app.use("/api/users", usersApiRoute);
// Tells app.js to use the const "usersApiRoute" that points to the routes/api/users.js file's code, to handle any request to "/api/users/" route.
// I wrote this code to try to send the MongoDB "users" data to the profile page, but not sure how to do it.


app.get("/home", middleware.requireLogin, (req, res, next) => {

    var payload = {
        pageTitle: "Home",
        // We will dynamically change the page title of the page home.pug by passing data (a great thing that PUG offers)
        userLoggedIn: req.session.user
        // It gives us the information (username, firstName etc.) of the user that logged in.
    }

    res.status(200).render("home.pug", payload);
    //200 HTTP response is for 'success'; it means all is okay.
    //Sends the payload object to the page home.ejs

});
// When someone accesses the server we use with a GET request and the path is the root of the website ("/"), execute the code that's in the arrow function.
// req(the request that's incoming to this path "/"), res(response -  the data we send back to the user), next(handles any middleware)

