const express = require("express");
// Declares Express dependency and tells Node that we're using Express with this file.
const app = express();
// Initializes Express by making app variable an instance of the Express object
const router = express.Router();
// creates const "router" which allows the file to use the Router function that comes with Express framework.
const bodyParser = require("body-parser");
// Uses body-parser package
// When we submit a form, the data that's sent to the server is sent in the request body. So we need to get it from the body.

const User = require("../../schemas/UserSchema"); 
// Allows us to user the UserSchema from this file.
const Post = require("../../schemas/PostSchema"); 
// Allows us to user the PostSchema from this file.

app.use(bodyParser.urlencoded({ extended: false }));
// Tells the app to use body-parser; "extended: false" is a setting and it means that the body 
// will be able to contain only key value pairs made up of strings or arrays (not all types of data).


router.get("/", (req, res, next) => {
// Configures the router we created (const router = express.Router();) 
    // to handle requests at the root level ("/") to execute the code that's in it.
// We use router.get and not app.get because the page handles a GET request at the root level,
    // it's not handling traffic to the server ( app.get() is doing that ).
// The router.get executes the code below.

    

});

router.post("/", async (req, res, next) => {
// Handles POST requests at the root level ("/") to execute the code that's in it.

    if(!req.body.content){
    // Checks if content was not sent
        console.log("Content param not sent with request");

        return res.sendStatus(400);
        // Informs the user with a Bad Request status and ends the post request (so that it won't continue to execute the code below)
    }

    var postData = {
    // Saves the data that was submitted by the user via the textform and saves it as an object called "postData"
        
        content: req.body.content,
        postedBy: req.session.user
    }

    Post.create(postData)
    // Creates the post
    .then(async (newPost) => {
    // .then() is called when "Post.create(postData)" successfully completes.
        
        newPost = await User.populate(newPost, { path: "postedBy" });
        // Populates the postedBy field using the "User" schema

        res.status(201).send(newPost)
        // If creating the post succeeds, it will send a 201 status and the data of the newly created post (newPost).
        // 201 status means "Created"

    })

    .catch((error) => {
    // .catch() is called if "Post.create(postData)" doesn't complete successfully and something went wrong with it.
        console.log(error);
        res.sendStatus(400);
    })
    
});

module.exports = router;
// Exports the router so we can execute the code that's in router.get in other pages.
