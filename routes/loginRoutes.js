const express = require("express");
// Declares Express dependency and tells Node that we're using Express with this file.
const app = express();
// Initializes Express by making app variable an instance of the Express object
const router = express.Router();
// creates const "router" which allows the file to use the Router function that comes with Express framework.
const bodyParser = require("body-parser");
// Uses body-parser package
// When we submit a form, the data that's sent to the server is sent in the request body. So we need to get it from the body.
const bcrypt = require("bcrypt");
// Allows the file to use brcypt
const User = require("../schemas/UserSchema"); 
// Allows us to user the UserSchema from this file.

app.use(bodyParser.urlencoded({ extended: false }));
// Tells the app to use body-parser; "extended: false" is a setting and it means that the body 
// will be able to contain only key value pairs made up of strings or arrays (not all types of data).

app.set("view engine", "pug");
// Tells our server which template engine we're going to use to display web pages.
app.set("views", "views");
// Tells the server that when it needs a view page (a template), go to the folder called "views" to look for the file.


router.get("/", (req, res, next) => {
// Configures the router we created (const router = express.Router();) 
    // to handle requests at the root level ("/") to execute the code that's in it.
// We use router.get and not app.get because page handles a GET request at the root level,
    // it's not handling traffic to the server (app.get() is doing that).
// The router.get executes the code below.

    res.status(200).render("login.pug");
    //200 HTTP response is for 'success'; it means all is okay.

});

router.post("/", async (req, res, next) => {
// Handles POST requests at the root level ("/") to execute the code that's in it.

    var payload = req.body;
    // Variables that contains all the values that the user submitted via the form.

    if(req.body.logUsername && req.body.logPassword){
    // Checks if there is a user in our db with that username

        var user = await User.findOne({ username: req.body.logUsername })
        // Makes sure that no user exists in our db with the username the user just submitted via the form.
        // It goes to the MongoDb db and checks if any row has the "username" that the user just submitted via the form.
        
        .catch((error) => {
            console.log(error);
            payload.errorMessage = "Something went wrong.";
            // It means that there was an error with the MongoDb db
            //Inserts the variable "errorMessage" to the body so that we can send it to login.pug via "payload" & render it there.
            res.status(200).render("login.pug", payload);
            // Renders again the register web page, so that the user can try to register again and
            // sends the payload to that page; the payload now contains the errorMessage value.
        })
        // This query returns a promise so I'm going to use .catch()

        if(user != null){
        // if the user is not null, it means that it found the username in the MongoDB db.
        // Now that we know that the username exists, we will check if the password matches.
            
            var result = await bcrypt.compare(req.body.logPassword, user.password)
            // compare is a bcrypt built-in function that allows us to compare an unencrypted password (req.body.logPassword)
            // with an encrypted one (user.password) - "password" is what is called in the MongoDB db (check UserSchema).

            if(result === true) {
            // if the typed in password was a match to the encrypted one that's in the db, execute the code below
            // Used 3 === to check if it's the correct type too.
                
                req.session.user = user; 
                // "user" is the user we found in the database with the same username.
                return res.redirect("home");
                // Redirects the user to the home.pug page ("/home").
            }
        }


        payload.errorMessage = "Login credentials incorrect.";
        //Inserts the variable "errorMessage" to the body so that we can send it to register.pug via "payload" & render it there.
        return res.status(200).render("login.pug", payload);
        // Renders again the register web page, so that the user can try to register again and
        // sends the payload to that page; the payload now contains the errorMessage value.
        // I used return so that it won't continue and execute the code below. 

    }

    payload.errorMessage = "Make sure each field has a valid value.";
    // Error message for when the user was not found in the db.
    //Inserts the variable "errorMessage" to the body so that we can send it to register.pug via "payload" & render it there.

    res.status(200).render("login.pug");
    //200 HTTP response is for 'success'; it means all is okay.
    
    });

module.exports = router;
// Exports the router so we can execute the code that's in router.get in other pages.
