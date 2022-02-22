const express = require("express");
// Declares Express dependency and tells Node that we're using Express with this file.
const app = express();
// Initializes Express by making app variable an instance of the Express object
const router = express.Router();
// creates const "router" which allows the file to use the Router function that comes with Express framework.
const bodyParser = require("body-parser");
// Uses body-parser package
// When we submit a form, the data that's sent to the server is sent in the request body. So we need to get it from the body.

app.set("view engine", "pug");
// Tells our server which template engine we're going to use to display web pages.
app.set("views", "views");
// Tells the server that when it needs a view page (a template), go to the folder called "views" to look for the file.

app.use(bodyParser.urlencoded({ extended: false }));
// Tells the app to use body-parser; "extended: false" is a setting and it means that the body 
// will be able to contain only key value pairs made up of strings or arrays (not all types of data).

router.get("/", (req, res, next) => {
// Configures the router we created (const router = express.Router();) 
    // to handle requests at the root level ("/") to execute the code that's in it.
// We use router.get and not app.get because page handles a GET request at the root level,
    // it's not handling traffic to the server (app.get() is doing that).
// The router.get executes the code below.

    res.status(200).render("register.pug");
    //200 HTTP response is for 'success'; it means all is okay.
    // When we do a GET submission in this route ("/" which is /register), it will render the register.pug page.

});

router.post("/", (req, res, next) => {
//Because in the form in register.pug we use a POST method to submit the data, we use router.post (instead router.get)

        console.log(req.body);
        var username = req.body.username.trim();
        var password = req.body.password.trim();
        //Prevents the user from registering with a username or password that is a string that consists of spaces.
        // trim() removes spaces before and after a string value
        var payload = req.body;
        // Variables that contains all the values that the user submitted via the form.

        if(username && password) {
        // If those variables are not null, proceed to the next step of registration
            
        }
        else {
        // If any of those two variables are null, execute the code below
            
            payload.errorMessage = "Fields cannot be empty.";
            //Inserts the variable "errorMessage" to the body so that we can send it to register.pug via "payload" page & render it there.
            res.status(200).render("register.pug", payload);
            // Renders again the register web page, so that the user can try to register again & sends the payload to that page.
        }

        //200 HTTP response is for 'success'; it means all is okay.
        // When we do a POST submission in this route ("/" which is /register), it will render the register.pug page.
    
    });

module.exports = router;
// Exports the router so we can execute the code that's in router.get in other pages.
