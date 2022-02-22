const mongoose = require("mongoose");

class Database {
    
    constructor(){
    // Constructor is the code that is execute when an instance of this class (Database) is created
        this.connect();
        // Invokes the connect() function below
    }

    connect() {
        mongoose.connect("mongodb://localhost/twitter-clone-users")
        //Connects the TwitterCloneDB MongoDB database - (Don't forget to start Docker!)
        .then(() => {
            console.log("Database connection successful")
        })
        //If connection is successful, it runs the code in then()
        .catch((err) => {
            console.log("Database connection error" + err)
        })
        //If connection is unsuccessful, it runs the code in catch()
    }
}

module.exports = new Database();
// Creates an instance of the class Database as the export of the file.
// So database.js file gives us an instance of class Database.