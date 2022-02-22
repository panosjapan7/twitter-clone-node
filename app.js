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