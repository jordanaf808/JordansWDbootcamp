//You can consolidate different 'const's...
// const express = require("express");
// const app = express();
// const axios = require('axios').default;
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
// const port = 3000

const express    =  require("express"),
	  app        = express(),
	  axios      = require("axios").default,
	  bodyParser = require("body-parser"),
	  mongoose   = require("mongoose");
const port       = 3000
	  
mongoose.connect("mongodb://localhost:27017/yelp_camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set("view engine", "ejs");

//SCHEMA SETUP:
const campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

const Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
// {
// 	name:"Kirk Creek Campground", 
//  	image: "/images/peter-vanosdall-6pVTxAaX448-unsplash.jpg",
// 	description: "This is a huge granite hill!"
// }, 
// 	(err, campground) => {
// 	if(err){
// 		console.log(err);
// 	} else {
// 		console.log("New Campground Created: ");
// 		console.log(campground);
// 	}
// });

const campgrounds = [
		// {name: "Ponderosa Campground", image: "/images/IMG_6086.jpg"},
		{name:"Kirk Creek Campground", image: "/images/peter-vanosdall-6pVTxAaX448-unsplash.jpg"},
		{name: "Yosemite National Park", image: "/images/aniket-deole-M6XC789HLe8-unsplash.jpg"},
		{name: "Ponderosa Campground", image: "/images/IMG_6086.jpg"},
		{name:"Kirk Creek Campground", image: "/images/peter-vanosdall-6pVTxAaX448-unsplash.jpg"},
		{name: "Yosemite National Park", image: "/images/aniket-deole-M6XC789HLe8-unsplash.jpg"}
	];

app.get("/", (req, res) => {
		res.render("landing");
		});

//INDEX - show all campgrounds
app.get("/campgrounds", (req, res) => {	
// 	get all campgrounds from DB
		Campground.find({}, (err, allCampgrounds) => {
	  if (err) return console.error(err);
	  else {
		  res.render("index", {campgrounds:allCampgrounds});
	  }
	});
});

// CREATE a new campground.
app.post("/campgrounds", (req, res) => {
	//get data from form and add to campgrounds array
	const name = req.body.name;
	const image = req.body.image;
	const desc = req.body.description;
	const newCampground = {name: name, image: image, description: desc}
	// create a new campground and save to DB
	Campground.create(newCampground, (err, newlyCreated) => {
		if(err){
		console.log(err);
		} else {
		//redirect back to campgrounds array
		res.redirect("/campgrounds"); 		 
		}
	});
});

app.get("/campgrounds/new", (req, res) => {
	res.render("new.ejs");
});

//SHOW - shows more info about one campground
app.get("/campgrounds/:id", (req, res) => {
	//find the campground by ID
	Campground.findById(req.params.id, (err, foundCampground) => {
		if(err){
			console.log(err);
		} else {
		//render show template with that campground
		res.render("show", {campground: foundCampground});		
		}
	});
});

app.listen(port, () => console.log(`YelpCamp listening at ${port}`))
