
exports.requireLogin = (req, res, next) => {
// Creates the requireLogin function which checks if the req.session property is set and if the req.session.user property is set.
// If the req.session.user exists it means that they are logged in. 
// If req.session.user doesn't exist, it means they haven't logged in yet and we redirect them to "/login" page.

    if(req.session && req.session.user) {
        return next();
        // When we return "next" it means that both req.session variables are true, which means that the user is logged in, so 
        // it says "carry on and do the next step in the cycle, which is to run the code in app.js: app.get("/", (req, res, next),
        // which is below the middlware code.
        // "next()" passes onto the next step in the request/response cycle (remember, this is middleware).
    }
    else {
        return res.redirect("/login");
    }
}