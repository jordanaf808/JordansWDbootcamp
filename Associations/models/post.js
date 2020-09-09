
const mongoose = require("mongoose");
//POST - title, content
const postSchema = new mongoose.Schema({
	title: String,
	content: String
});

// const Post = mongoose.model("Post", postSchema);

//Tell where we want to send the data returned from this ^^ model.
module.exports = mongoose.model("Post", postSchema);