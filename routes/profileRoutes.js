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

// TRYING TO UPDATE FIRST NAME
app.use(bodyParser.urlencoded({extended: false}))

router.get("/", async (req, res, next) => {
    // Configures the router we created (const router = express.Router();) 
        // to handle requests at the root level ("/:id") to execute the code that's in it.
    // We use router.get and not app.get because the page handles a GET request at the root level,
        // it's not handling traffic to the server (app.get() is doing that).
    // The router.get executes the code below.
    
    const user = await User.findById(req.session.user._id)
    var payload = {
        pageTitle: user.username,
        userLoggedIn: user,
        userLoggedInJs: JSON.stringify(user),
        profileUser: user
    }
    res.status(200).render("profilePage", payload);
    
});

router.get("/:username", async (req, res, next) => {
    // Takes us to another user's profile page
    // Configures the router we created (const router = express.Router();) 
        // to handle requests at the root level ("/:username") to execute the code that's in it.
    // We use router.get and not app.get because the page handles a GET request at the root level,
        // it's not handling traffic to the server (app.get() is doing that).
    // The router.get executes the code below.
    
    var payload = await getPayload(req.params.username, req.session.user);

    res.status(200).render("profilePage", payload);
    
});


// TRYING TO UPDATE FIRST NAME
router.post("/", async (req, res, next) => {
    // console.log(req.body);
    // if(firstName){
    //     var firstName = req.body.firstName.trim();
    // }
    // if(lastName){
    //     var lastName = req.body.lastName.trim();
    // }
    // if(email){
    //     var email = req.body.email.trim();
    // }

    // var payload = req.body;
    // console.log(payload)

    
    // if(firstName){
    //     console.log(firstName)
    // }

    // if(lastName){
    //     console.log(lastName)
    // }
    
    // if(email){
        
    //     console.log(email)
    // }
    
    
});



async function getPayload(username, userLoggedIn){
    
    var user = await User.findOne({ username: username })
    // it will search the db by "username" to find a user that has this "username" and will fetch the data of that user

    if(user == null){
    // In case a user with that username doesn't exist, return the values below
        
        return {
            pageTitle: "User not found",
            userLoggedIn: userLoggedIn,
            userLoggedInJs: JSON.stringify(userLoggedIn),
        }
    }

    return {
    // If it found a user with that username, return the values below

        pageTitle: user.username,
        userLoggedIn: userLoggedIn,
        userLoggedInJs: JSON.stringify(userLoggedIn),
        profileUser: user
    }

}

module.exports = router;
// Exports the router so we can execute the code that's in router.get in other pages.
