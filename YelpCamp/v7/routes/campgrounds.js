
const express = require("express");
const router = express.Router();
const Campground = require("../models/campground")

//INDEX - show all campgrounds
router.get("/", (req, res) => {	
// 	get all campgrounds from DB
		Campground.find({}, (err, allCampgrounds) => {
	  if (err) return console.error(err);
	  else {
		  res.render("campgrounds/index", {campgrounds:allCampgrounds, currentUser: req.user});
	  }
	});
});

// CREATE a new campground.
router.post("/", isLoggedIn, (req, res) => {
	//get data from form and add to campgrounds array
	const name = req.body.name;
	const image = req.body.image;
	const desc = req.body.description;
	const author = {
		id: req.user._id,
		username: req.user.username
	}
	const newCampground = {name: name, image: image, description: desc, author: author}
	// create a new campground and save to DB
	Campground.create(newCampground, (err, newlyCreated) => {
		if(err){
		console.log(err);
		} else {
		//redirect back to campgrounds array
		res.redirect("/campgrounds"); 
			console.log(newlyCreated);
		}
	});
});

//NEW - Show form to create campground.
router.get("/new", isLoggedIn, (req, res) => {
	res.render("campgrounds/new");
});

//SHOW - show more info about campground.
router.get("/:id", isLoggedIn, (req, res) => {
	//find the campground by ID
	Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
		if(err){
			console.log(err);
		} else {
			console.log(foundCampground);
		//render show template with that campground
		res.render("campgrounds/show", {campground: foundCampground});		
		}
	});
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}


module.exports = router