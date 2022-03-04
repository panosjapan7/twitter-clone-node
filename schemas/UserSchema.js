const mongoose = require("mongoose");
// Adds a connection to our MongoDB db

const Schema = mongoose.Schema;
// We declare that mongoose.Schema is a type of Schema
// We type uppercase 'S' because this is going to be a type.

const UserSchema = new  Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        // trim: true,
        // default: "Anonymous"
    },
    lastName: {
        type: String,
        // trim: true,
        // default: "Anonymous"
    },
    profilePic: {
        type: String,
        default: "/images/profilePic.png",
    }
}, { timestamps: true }); // Adds a timestamp to every entry in the db; prettty easy to implement!
// Creates the schema for our user collection. In the parentheses we pass in the options (the columns and data types);

var User = mongoose.model("User", UserSchema);
module.exports = User;
// Exports the schema. The model() function is how you export a model. 
// It allows all connections to the "mongoose = require("mongoose");" db to have access to this schema by accessing the "User" property.