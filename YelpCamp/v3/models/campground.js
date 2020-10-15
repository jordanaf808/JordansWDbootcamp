
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//SCHEMA SETUP:
const campgroundSchema = new mongoose.Schema({
	name: String,
	price: String,
	image: String,
	description: String,
	location: String,
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
});

module.exports = mongoose.model("Campground", campgroundSchema);