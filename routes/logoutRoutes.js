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


router.get("/", (req, res, next) => {
// Configures the router we created (const router = express.Router();) 
    // to handle requests at for the logout path ("/") and executes the code that's in it.
// We use router.get and not app.get because the page handles a GET request at the root level,
    // it's not handling traffic to the server (app.get() is doing that).
// The router.get executes the code below.

    if(req.session){
    // If the session is set (it's not null)
        req.session.destroy(() => {
            res.redirect("/")
        })
        // When destroy() finishes, it redirects the user to the root route. 
    }

});


module.exports = router;
// Exports the router so we can execute the code that's in router.get in other pages.
