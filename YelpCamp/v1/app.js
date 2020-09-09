const express = require("express");
const app = express();
const axios = require('axios').default;
const bodyParser = require("body-parser");
const port = 3000

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.set("view engine", "ejs");

const campgrounds = [
		{name: "Ponderosa Campground", image: "/images/IMG_6086.jpg"},
		{name:"Kirk Creek Campground", image: "/images/peter-vanosdall-6pVTxAaX448-unsplash.jpg"},
		{name: "Yosemite National Park", image: "/images/aniket-deole-M6XC789HLe8-unsplash.jpg"},
		{name: "Ponderosa Campground", image: "/images/IMG_6086.jpg"},
		{name:"Kirk Creek Campground", image: "/images/peter-vanosdall-6pVTxAaX448-unsplash.jpg"},
		{name: "Yosemite National Park", image: "/images/aniket-deole-M6XC789HLe8-unsplash.jpg"}
	];

app.get("/", (req, res) => {
		res.render("landing");
		});

app.get("/campgrounds", (req, res) => {
	
	res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", (req, res) => {
	//get data from form and add to campgrounds array
	const name = req.body.name;
	const image = req.body.image;
	const newCampground = {name: name, image: image}
	campgrounds.push(newCampground)
	//redirect back to campgrounds array
	res.redirect("/campgrounds"); 
	});

app.get("/campgrounds/new", (req, res) => {
	res.render("new.ejs");
});

app.listen(port, () => console.log(`YelpCamp listening at ${port}`))
