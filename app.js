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

const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})
// Creates out server instance. We tell it which port to listen to and then what code to run once it starts listening.

app.set("view engine", "pug");
// Tells our server which template engine we're going to use to display web pages.
app.set("views", "views");
// Tells the server that when it needs a view page (a template), go to the folder called "views" to look for the file.

app.get("/", (req, res, next) => {
    
    res.status(200).render("home.pug");
    //200 HTTP response is for 'success'; it means all is okay.

});
// When someone accesses the server we use with a GET request and the path is the root of the website ("/"), execute the code that's in the arrow function.
// req(the request that's incoming to this path "/"), res(response -  the data we send back to the user), next(handles any middleware)