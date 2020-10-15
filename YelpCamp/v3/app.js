//You can consolidate different 'const's...
// const express = require("express");
// const app = express();
// const axios = require('axios').default;
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
// const port = 3000

const express    	= require("express"),
			path 				= require('path'),
	  	app        	= express(),
	  	axios      	= require("axios").default,
	  	bodyParser 	= require("body-parser"),
			mongoose   	= require("mongoose"),
			engine			= require('ejs-mate'),
	  	Campground 	= require("./models/campground"),
			seedDB	 		= require("./seeds"),
			db 					= mongoose.connection,
			port       	= 3000;

	mongoose.connect("mongodb://localhost:27017/yelp_camp_v11", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
	// useFindAndModify: false,
	useCreateIndex: true
})

db.on("error", console.error,bind(console, "connection error:"));
db.once("open", () => {
	console.log("Database connected");
});

// const connectDB = async () =>{
// 	try {
// 	const conn = await mongoose.connect(process.env.MONGO_URI, {
// 		useNewUrlParser: true,
// 		useUnifiedTopology: true,
// 		useFindAndModify: false,
// 		// useCreateIndex: true
// 	})
// 	console.log(`MongoDB Connected: ${conn.connection.host}`)
// 	} catch(error){
// 		console.log(error.message)
// 	};
// }

// connectDB()

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'))

// seedDB();

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
app.get("/campgrounds", async (req, res) => {	
// 	get all campgrounds from DB
		const campgrounds = await Campground.find({});
		res.render("index", {campgrounds:allCampgrounds});
});

// CREATE a new campground.
app.post("/campgrounds", (req, res) => {
	const campground = new Campground(req.body,campground);
	await campground.save();
	res.redirect(`/campgrounds/${campground._id}`)
	// //get data from form and add to campgrounds array
	// const name = req.body.name;
	// const image = req.body.image;
	// const desc = req.body.description;
	// const newCampground = {name: name, image: image, description: desc}
	// // create a new campground and save to DB
	// Campground.create(newCampground, (err, newlyCreated) => {
	// 	if(err){
	// 	console.log(err);
	// 	} else {
	// 	//redirect back to campgrounds array
	// 	res.redirect("/campgrounds"); 		 
	// 	}
	// });
});

app.get("/campgrounds/new", (req, res) => {
	res.render("new.ejs");
});

//SHOW - shows more info about one campground
app.get("/campgrounds/:id", (req, res) => {
	//find the campground by ID
	Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
		if(err){
			console.log(err);
		} else {
			console.log(foundCampground);
		//render show template with that campground
		res.render("show", {campground: foundCampground});		
		}
	});
});

app.listen(port, () => console.log(`YelpCamp listening at ${port}`))
