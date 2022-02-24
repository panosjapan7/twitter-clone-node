const express = require("express");
// Declares Express dependency and tells Node that we're using Express with this file.
const app = express();
// Initializes Express by making app variable an instance of the Express object
const router = express.Router();
// creates const "router" which allows the file to use the Router function that comes with Express framework.


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

    res.status(200).render("root.pug");
    //200 HTTP response is for 'success'; it means all is okay.

});

module.exports = router;
// Exports the router so we can execute the code that's in router.get in other pages.
