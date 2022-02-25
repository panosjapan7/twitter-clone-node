const mongoose = require("mongoose");
// Adds a connection to our MongoDB db

const Schema = mongoose.Schema;
// We declare that mongoose.Schema is a type of Schema
// We type uppercase 'S' because this is going to be a type.

const PostSchema = new  Schema({
    content: { type: String, trim: true },
    postedBy:{ type: Schema.Types.ObjectId, ref: "User" },
    // Mongoose creates an object that contains all the data of the user with the ObjectId ("_id" value in MongoDB db) from the "User" db
}, { timestamps: true }); // Adds a timestamp to every entry in the db; prettty easy to implement!
// Creates the schema for our user collection. In the parentheses we pass in the options (the columns and data types);

var Post = mongoose.model("Post", PostSchema);
module.exports = Post;
// Exports the schema. The model() function is how you export a model. 
// It allows all connections to the "mongoose = require("mongoose");" db to have access to this schema by accessing the "Post" property.