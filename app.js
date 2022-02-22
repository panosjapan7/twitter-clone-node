// Fifth attempt at creating a Twitter clone for the Backend 1 exercise
// I tried doing it with .ejs files but had problem injecting code to HTML elements; it's much easier with PUG.
// I tried using the strategies and code we use in the lektioner but haven't understood much.
// I'll be using internet tutorials to try and solve this puzzle.

const express = require("express");
// Declares Express dependency and tells Node that we're using Express with this file.

const app = express();
// Initializes Express by making app variable an instance of the Express object

const PORT = 7000;
// Creates the port that the server of this app will run on.

const path = require("path"); 
// Uses the built-in path library, which I'll use to serve static files like images, css files etc.

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

// ROUTES
const loginRoute = require("./routes/loginRoutes");
// Declares the loginRoute
const registerRoute = require("./routes/registerRoutes");
// Declares the registerRoute

app.use("/login", loginRoute);
// Tells app.js to use the const "loginRoute" that points to the loginRoutes.js file's code, to handle any request to "/login" route.
app.use("/register", registerRoute);
// Tells app.js to use the const "registerRoute" that points to the registerRoutes.js file's code, to handle any request to "/register" route.

app.get("/", (req, res, next) => {

    var payload = {
        pageTitle: "Home"
        // We will dynamically change the page title of the page home.pug by passing data (a great thing that PUG offers)
    }

    res.status(200).render("home.pug", payload);
    //200 HTTP response is for 'success'; it means all is okay.
    //Sends the payload object to the page home.ejs

});
// When someone accesses the server we use with a GET request and the path is the root of the website ("/"), execute the code that's in the arrow function.
// req(the request that's incoming to this path "/"), res(response -  the data we send back to the user), next(handles any middleware)